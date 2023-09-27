import { IsArray, IsDate, IsString } from 'class-validator';

export class PeopleWantedDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  nationality: string;

  @IsString()
  picture: string;

  @IsString()
  birth: string;

  @IsString()
  reward: string;

  @IsString()
  infos: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
