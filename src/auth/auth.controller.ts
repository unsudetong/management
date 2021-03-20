import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth.local.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/local')
  async login(@Request() req) {
    return req.user;
  }

  @Get()
  async test() {
    console.log(123);
  }
}
