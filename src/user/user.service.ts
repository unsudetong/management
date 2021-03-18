import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userReopsitory: UserRepository) {}

  async create(userData: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userReopsitory.save(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userReopsitory.find();
  }

  async findOne(userId: number): Promise<User> {
    return this.userReopsitory.findOne(userId);
  }

  async delete(userId: number) {
    return this.userReopsitory.delete({ ID: userId });
  }

  async update(userId: number, userData: UpdateUserDto) {
    return this.userReopsitory.save({ ...userData, ID: userId });
  }
}
