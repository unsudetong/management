import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userReopsitory: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userReopsitory.find();
  }

  // async create(adminData: CreateAdminDto): Promise<CreateAdminDto & User> {
  //   return await this.userReopsitory.save(adminData);
  // }
}
