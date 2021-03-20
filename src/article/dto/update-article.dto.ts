import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  readonly TITLE?: string;

  @IsOptional()
  @IsString()
  readonly CONTENTS?: string;

  @IsOptional()
  @IsNumber()
  readonly ADMIN_ID?: number;

  @IsOptional()
  @IsNumber()
  readonly PROJECT_ID?: number;

  @IsOptional()
  @IsNumber()
  readonly ORDER?: number;
}
