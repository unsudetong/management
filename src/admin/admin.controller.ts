import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAll(): Promise<Admin[]> {
    return await this.adminService.getAll();
  }
}
