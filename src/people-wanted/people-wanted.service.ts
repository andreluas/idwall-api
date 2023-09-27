import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleWanted } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeopleWantedService {
    constructor(private service: PrismaService) { }

    async getPeoples(): Promise<PeopleWanted[]> {
        return this.service.peopleWanted.findMany({
            include: {
                crimes: true
            }
        })
    }

    async getPeopleById(id: string): Promise<PeopleWanted> {
        const people = await this.service.peopleWanted.findUnique({
            where: { id },
                        include: {
                crimes: true
            }
        })

        if (!people) {
            throw new NotFoundException(`ID ${id} - not found in database`)
        }

        return people
    }
}
