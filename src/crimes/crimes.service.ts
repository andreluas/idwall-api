import { Injectable } from '@nestjs/common';
import { Crime } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrimesService {
    constructor(private service: PrismaService) { }

    async getCrimes(id: string): Promise<Crime[]> {
        return this.service.crime.findMany({
            where: {
                peopleWantedId: id
            }
        })
    }
}
