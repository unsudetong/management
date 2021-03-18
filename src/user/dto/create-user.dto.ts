import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(1, 50)
  @IsString()
  USER_ID: string;

  @Length(1, 100)
  @IsString()
  PASSWORD: string;

  @IsOptional()
  @Length(18)
  @IsString()
  MAJOR?: string;

  @IsOptional()
  @Length(18)
  @IsString()
  DOUBLE_MAJOR?: string;

  @IsOptional()
  @IsNumber()
  STUDENT_ID?: number;

  @IsOptional()
  @Length(50)
  @IsString()
  OAUTH_ID?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsString()
  updatedAt?: string;
}
