import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'USER_ID',
      passwordField: 'PASSWORD',
    });
  }

  async validate(USER_ID: string, PASSWORD: string): Promise<User> {
    const user = await this.authService.validateUser(USER_ID, PASSWORD);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
