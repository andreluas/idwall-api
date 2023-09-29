import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PeopleWanted } from '@prisma/client';
import { PeopleWantedService } from './people-wanted.service';

@Controller('people-wanted')
export class PeopleWantedController {
  constructor(private service: PeopleWantedService) {}

  @Get()
  async getPeoples(
    @Query('name') name: string,
    @Query('nickname') nickname: string,
    @Query('nationality') nationality: string,
  ): Promise<PeopleWanted[]> {
    return this.service.getPeoples({
      name,
      nickname,
      nationality,
    });
  }

  @Get(':id')
  async getPeopleById(@Param('id') id: string): Promise<PeopleWanted> {
    return await this.service.getPeopleById(id);
  }
}
