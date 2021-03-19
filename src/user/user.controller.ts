import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import bcrypt from 'bcrypt';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.PASSWORD, 12);
    userData = { ...userData, PASSWORD: hashedPassword };
    const createdUser = await this.userService.create(userData);
    return createdUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Delete('/:id')
  async delete(@Param('id') userId: number) {
    return this.userService.delete(userId);
  }

  @Put('/:id')
  async update(@Param('id') userId: number, @Body() userData: UpdateUserDto) {
    if (userData.PASSWORD) {
      const hashedPassword = await bcrypt.hash(userData.PASSWORD, 12);
      userData.PASSWORD = hashedPassword;
    }
    const updatedUser = await this.userService.update(userId, userData);
    return updatedUser;
  }
}
