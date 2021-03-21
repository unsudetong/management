import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(USER_ID: string, PASSWORD: string): Promise<any> {
    const user = await this.userService.findOneByUserId(USER_ID);
    if (bcrypt.compare(user.PASSWORD, PASSWORD)) {
      const { PASSWORD, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authCredentialDto) {
    const payload = {
      USER_ID: authCredentialDto.USER_ID,
      DATE: new Date(),
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
