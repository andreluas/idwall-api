import {
    IsDate,
    IsString,
} from 'class-validator';

export class CrimesDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  danger: string;

  @IsString()
  peopleWantedId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}