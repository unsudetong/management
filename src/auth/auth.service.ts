import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.userService.findUserId(userId);
    if (bcrypt.compare(user.PASSWORD, password)) {
      const { PASSWORD, ...result } = user;
      return result;
    }
    return null;
  }
}
