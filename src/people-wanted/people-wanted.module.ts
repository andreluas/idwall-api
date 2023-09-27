import { Module } from '@nestjs/common';
import { PeopleWantedService } from './people-wanted.service';
import { PeopleWantedController } from './people-wanted.controller';

@Module({
  providers: [PeopleWantedService],
  controllers: [PeopleWantedController]
})
export class PeopleWantedModule {}
