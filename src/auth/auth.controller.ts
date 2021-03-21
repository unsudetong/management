import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth.local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/auth.jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  // 실제로는 guard만 쓰일 것이며, 아래 API는 사용되지 않음.
  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req) {
    return await this.authService.login(req.user);
  }
}
