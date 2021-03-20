import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  readonly DEPARTMENT?: string;

  @IsOptional()
  @IsNumber()
  readonly ORDER?: number;
}
