import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PeopleWanted } from '@prisma/client';
import { PeopleWantedService } from './people-wanted.service';

@Controller('people-wanted')
export class PeopleWantedController {
    constructor(private service: PeopleWantedService) { }

    @Get()
    async getPeoples(): Promise<PeopleWanted[]> {
        return this.service.getPeoples();
    }

    @Get(':id')
    async getPeopleById(@Param('id') id: string): Promise<PeopleWanted> {
        return await this.service.getPeopleById(id)
    }
}
