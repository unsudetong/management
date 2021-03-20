import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  readonly TITLE?: string;

  @IsOptional()
  @IsNumber()
  readonly WRITER?: number;

  @IsOptional()
  @IsNumber()
  readonly TRACK_ID?: number;

  @IsOptional()
  @IsNumber()
  readonly ORDER?: number;
}
