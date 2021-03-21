import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/guards/auth.jwt.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.PASSWORD, 12);
    userData = { ...userData, PASSWORD: hashedPassword };
    const createdUser = await this.userService.create(userData);
    return createdUser;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async findOneByUserId(@Body() userId: string): Promise<User> {
    return this.userService.findOneByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') userId: number) {
    return this.userService.delete(userId);
  }

  @UseGuards(JwtAuthGuard)
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
