import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }

  @Post()
  async create(@Body() adminData: CreateAdminDto) {
    const createdAdmin = await this.adminService.create(adminData);
    return createdAdmin;
  }

  @Delete('/:id')
  async delete(@Param('id') adminId: number) {
    return this.adminService.delete(adminId);
  }
}
