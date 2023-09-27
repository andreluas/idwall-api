import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { PrismaService } from 'src/prisma/prisma.service';
import { PeopleWantedType } from './types';
import { PeopleWantedDto } from 'src/people-wanted/dto';
import { CrimesDto } from 'src/crimes/dto';

@Injectable()
export class WebScrapingService {
  constructor(private service: PrismaService) {}

  async webScrapping(): Promise<any> {
    const url = 'https://www.fbi.gov/wanted/topten';
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0',
    };

    async function getHTML(url) {
      const { data: html } = await axios.get(url, { headers });
      return html;
    }

    async function getData(urls: string[]) {
      const wantedListPromises = urls.map(async (url) => {
        const res = await getHTML(url);
        const $ = cheerio.load(res);

        const wanted = {
          name: $('.wanted-person-wrapper .documentFirstHeading').text(),
          nickname: $('.wanted-person-aliases > p').text(),
          nationality: $(
            '.wanted-person-description > table > tbody > tr:nth-child(2) > td:nth-child(2)',
          ).text(),
          picture: $('.wanted-person-mug > img').attr('src'),
          birth: $(
            '.wanted-person-description > table > tbody > tr:nth-child(1) > td:nth-child(2)',
          ).text(),
          reward: $('.wanted-person-reward > p').text(),
          infos: $('.wanted-person-remarks > p').text(),
          crime_description: $('.wanted-person-wrapper > .summary').text(),
          crime_danger: $('.wanted-person-caution > p').text(),
        };

        return wanted;
      });

      const wantedList = await Promise.all(wantedListPromises);
      return wantedList;
    }

    async function getUrls() {
      const res = await getHTML(url);
      const $ = cheerio.load(res);
      const wantedUrlsList = [];

      $('.portal-type-person.castle-grid-block-item').each((i, fugitives) => {
        const link = $(fugitives)
          .find('.portal-type-person.castle-grid-block-item .title > a')
          .attr('href');
        wantedUrlsList.push(link);
      });

      return wantedUrlsList;
    }

    const urls: string[] = await getUrls();
    const data: PeopleWantedType[] = await getData(urls);
    const verifyDatabase = await this.service.peopleWanted.count();

    if (verifyDatabase === 0) {
      for (const e of data) {
        const wantedDto = new PeopleWantedDto();
        wantedDto.name = e.name;
        wantedDto.nickname = e.nickname;
        wantedDto.nationality = e.nationality;
        wantedDto.picture = e.picture;
        wantedDto.birth = e.birth;
        wantedDto.reward = e.reward;
        wantedDto.infos = e.infos;

        try {
          await this.service.peopleWanted.create({
            data: {
              name: wantedDto.name,
              nickname: wantedDto.nickname,
              nationality: wantedDto.nationality,
              picture: wantedDto.picture,
              birth: wantedDto.birth,
              reward: wantedDto.reward,
              infos: wantedDto.infos,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      for (const e of data) {
        const wantedId = await this.service.peopleWanted.findFirst({
          where: {
            name: e.name,
          },
        });

        if (!wantedId) {
          throw new NotFoundException('Wanted not found');
        }

        const crimeDto = new CrimesDto();
        crimeDto.description = e.crime_description;
        crimeDto.danger = e.crime_danger;
        crimeDto.peopleWantedId = wantedId.id;

        try {
          await this.service.crime.create({
            data: {
              description: crimeDto.description,
              danger: crimeDto.danger,
              peopleWantedId: crimeDto.peopleWantedId,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      return 'Web-scraping realizado com sucesso!';
    } else {
      return 'O banco de dados já foi populado, não será necessário realizar o web-scraping!';
    }
  }
}
