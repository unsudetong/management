import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  readonly DEPARTMENT?: string;

  @IsNumber()
  readonly ORDER?: number;
}
