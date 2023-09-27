import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PeopleWantedModule } from './people-wanted/people-wanted.module';
import { CrimesModule } from './crimes/crimes.module';
import { WebScrapingModule } from './web-scraping/web-scraping.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PeopleWantedModule,
    CrimesModule,
    WebScrapingModule
  ],
})
export class AppModule { }
