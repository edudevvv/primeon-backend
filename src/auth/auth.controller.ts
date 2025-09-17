import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";

import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./service/auth.service";
import { JwtAuthGuard } from "./guards/auth.guard";

@Controller({ path: "auth" })
export class AuthController { 
  constructor (
    private service: AuthService
  ) {}

  @Post("register")
  async handleRegister(@Body() data: AuthDto) { 
    return this.service.handleAuthRegister(data);
  }

  @Post("login")
  async handleLogin(@Body() data: AuthDto) {
    return this.service.handleAuthLogin(data);
  }

  @Get("me") 
  @UseGuards(JwtAuthGuard)
  async handleMe(@Request() req: any) {
    return this.service.handleMe(req.user.userId);
  }
}