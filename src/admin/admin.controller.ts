import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.jwt.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() adminData: CreateAdminDto) {
    const createdAdmin = await this.adminService.create(adminData);
    return createdAdmin;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') adminId: number) {
    return this.adminService.delete(adminId);
  }

  // @Head()
  // async isAdmin(@Req() Reqeust) {
  //   return this.adminService.isAdmin();
  // }
}
