import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleWanted } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeopleWantedService {
  constructor(private service: PrismaService) {}

  async getPeoples(params: {
    name?: string;
    nickname?: string;
    nationality?: string;
  }): Promise<PeopleWanted[]> {
    const { name, nickname, nationality } = params;
    return this.service.peopleWanted.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        nickname: {
          contains: nickname,
          mode: 'insensitive',
        },
        nationality: {
          contains: nationality,
          mode: 'insensitive',
        },
      },
      include: {
        crimes: true,
      },
    });
  }

  async getPeopleById(id: string): Promise<PeopleWanted> {
    const people = await this.service.peopleWanted.findUnique({
      where: { id },
      include: {
        crimes: true,
      },
    });

    if (!people) {
      throw new NotFoundException(`ID ${id} - not found in database`);
    }

    return people;
  }
}
