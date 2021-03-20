import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly TITLE: string;

  @IsString()
  readonly CONTENTS: string;

  @IsNumber()
  readonly ADMIN_ID: number;

  @IsNumber()
  readonly PROJECT_ID: number;

  @IsOptional()
  @IsNumber()
  readonly ORDER?: number;
}
