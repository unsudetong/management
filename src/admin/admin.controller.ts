import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.jwt.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() adminData: CreateAdminDto) {
    const createdAdmin = await this.adminService.create(adminData);
    return {
      message: '관리자를 새로 생성하였습니다.',
      result: createdAdmin,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const admins = await this.adminService.findAll();
    return {
      message: '관리자 데이터를 가져왔습니다.',
      result: admins,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') adminId: number) {
    const deletedAdmin = await this.adminService.delete(adminId);
    return {
      message: '관리자를 삭제하였습니다.',
      result: deletedAdmin,
    };
  }

  // @Head()
  // async isAdmin(@Req() Reqeust) {
  //   return this.adminService.isAdmin();
  // }
}
