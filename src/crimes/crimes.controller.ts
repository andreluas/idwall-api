import { Controller, Get, Param } from '@nestjs/common';
import { Crime } from '@prisma/client';
import { CrimesService } from './crimes.service';

@Controller('crimes')
export class CrimesController {
    constructor(private service: CrimesService) { }

    @Get(':id')
    async getCrimes(@Param('id') id: string): Promise<Crime[]> {
        return await this.service.getCrimes(id)
    }
}
