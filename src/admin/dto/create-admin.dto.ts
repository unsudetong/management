import { IsNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNumber()
  readonly USER_ID: number;
}
