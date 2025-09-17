import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { PrismaService } from "@/common/prisma/prisma.service";
import { AuthRepository } from "./repository/auth.repository";
import { AuthService } from "./service/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({ 
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService, JwtStrategy]
})

export class AuthModule {}