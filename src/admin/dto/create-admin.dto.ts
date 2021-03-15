import { IsNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNumber()
  readonly ID: number;

  @IsNumber()
  readonly USER_ID: number;
}
