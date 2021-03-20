import { IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly DEPARTMENT: string;

  @IsNumber()
  readonly ORDER?: number;
}
