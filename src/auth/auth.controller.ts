import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./service/auth.service";
import { JwtAuthGuard } from "./guards/auth.guard";

@Controller({ path: "auth" })
export class AuthController { 
  constructor (
    private service: AuthService
  ) {}

  @Post("register")
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  public async handleRegister(@Body() data: AuthDto) { 
    return this.service.handleAuthRegister(data);
  }

  @Post("login")
  @Throttle({ default: { limit: 4, ttl: 60000 } })
  public async handleLogin(@Body() data: AuthDto) {
    return this.service.handleAuthLogin(data);
  }

  @Get("me") 
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  public async handleMe(@Request() req: any) {
    return this.service.handleMe(req.user.userId);
  }
}