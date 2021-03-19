import { Injectable } from '@nestjs/common';
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

  // async create(adminData: CreateAdminDto): Promise<CreateAdminDto & Admin> {
  // return await this.adminReopsitory.save(adminData);
  // }
}
