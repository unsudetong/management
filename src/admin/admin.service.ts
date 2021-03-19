import { HttpCode, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminReopsitory: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminReopsitory.find();
  }

  async create(adminData: CreateAdminDto): Promise<CreateAdminDto & Admin> {
    return await this.adminReopsitory.save(adminData);
  }

  async delete(adminId: number) {
    return this.adminReopsitory.delete({ ID: adminId });
  }

  // @HttpCode(200)
  // async isAdmin(@Req() Request) {
  //   const user = Request.user;
  //   const admin = await this.adminReopsitory.findOne({ USER_ID: user.ID });
  //   if (!admin) {
  //     throw new NotFoundException(`Admin with USER_ID : ${user.ID} not found.`);
  //   }
  //   return;
  // }
}
