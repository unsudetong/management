import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: CreateUserDto) {
    const createdUser = await this.userService.create(userData);
    return createdUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Delete()
  async delete(@Param() userId: number) {
    return this.userService.delete(userId);
  }

  @Put()
  async update(@Param() userId: number, @Body() userData: UpdateUserDto) {
    const updatedUser = await this.userService.update(userId, userData);
    return updatedUser;
  }
}
