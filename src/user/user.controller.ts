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
    return {
      message: '유저를 새로 생성하였습니다.',
      result: createdUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      message: '유저를 가져왔습니다.',
      result: users,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async findOneByUserId(@Body() userId: string) {
    const user = await this.userService.findOneByUserId(userId);
    return {
      message: '로그인에 성공하였습니다.',
      result: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findOne(@Param('id') userId: number) {
    const user = await this.userService.findOne(userId);
    return {
      message: '단일 유저를 가져왔습니다.',
      result: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') userId: number) {
    const deletedUser = await this.userService.delete(userId);
    return {
      message: '유저를 삭제하였습니다.',
      result: deletedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param('id') userId: number, @Body() userData: UpdateUserDto) {
    if (userData.PASSWORD) {
      const hashedPassword = await bcrypt.hash(userData.PASSWORD, 12);
      userData.PASSWORD = hashedPassword;
    }
    const updatedUser = await this.userService.update(userId, userData);
    return {
      message: '유저를 수정하였습니다.',
      result: updatedUser,
    };
  }
}
