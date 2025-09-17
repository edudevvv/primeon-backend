import "dotenv/config";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync, hashSync } from "bcryptjs";

import { AuthDto } from "../dto/auth.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class AuthRepository { 
  constructor (
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  public async findByEmail(email: string) { 
    try { 
      const user: object | null = await this.prisma.users.findUnique({ where: { email }, omit: { deletedAt: true } });

      if (user) return user;
      else return null;
    } catch {  
      return null;
    }
  }

  public async findById(id: string) { 
    try { 
      const user: object | null = await this.prisma.users.findUnique({ 
        where: { id }, 
        omit: { passwordHashed: true, deletedAt: true }, 
        include: { 
          apps: { omit: { deletedAt: true } } 
        } 
      });

      if (user) return user;
      else return null;
    } catch {  
      return null;
    }
  }

  public async create(data: AuthDto) { 
    try  {
      const userExists: object | null = await this.findByEmail(data.email);
      if (userExists) return null;

      const passwordHashed: string = await hashSync(data.password, 10);

      const user: object = await this.prisma.users.create({ 
        data: {
          email: data.email,
          passwordHashed
        }
      });

      return user;
    } catch (e) {
      console.log(e) 
      return null;
    }
  }

  public async login(data: AuthDto) {
    try { 
      const userExists: any = await this.findByEmail(data.email);
      if (!userExists) return null;

      const passwordCompared: boolean = compareSync(data.password, userExists?.passwordHashed);
      if (!passwordCompared) return null;

      const token: string = await this.jwtService.signAsync({ sub: userExists.id });
      return token;
    } catch (e: unknown) {
      return null;
    }
  }
}