import { Module } from '@nestjs/common';
import { CrimesController } from './crimes.controller';
import { CrimesService } from './crimes.service';

@Module({
  controllers: [CrimesController],
  providers: [CrimesService]
})
export class CrimesModule {}
