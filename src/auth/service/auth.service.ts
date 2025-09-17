import { Injectable } from "@nestjs/common";

import { AuthDto } from "../dto/auth.dto";
import { AuthMessages } from "../../common/constants/messages";
import { AuthRepository } from "../repository/auth.repository";

@Injectable()
export class AuthService { 
  constructor (
    private repository: AuthRepository
  ) {}

  public async handleAuthRegister(data: AuthDto) {
    try { 
      const findUser: object | null = await this.repository.findByEmail(data.email);
      if (findUser) return AuthMessages.USER_ALREADY_EXISTS;
    
      await this.repository.create(data);
      return AuthMessages.USER_REGISTERED_SUCCESSFULLY;
    } catch (e: unknown) { 
      return AuthMessages.INTERNAL_SERVER_ERROR;
    }
  }

  public async handleAuthLogin(data: AuthDto) {
    try { 
      const findUser: object | null = await this.repository.findByEmail(data.email);
      if (!findUser) return AuthMessages.USER_NOT_EXISTS;

      const logged = await this.repository.login(data);
      if (!logged) return AuthMessages.INVALID_CREDENTIALS;

      return logged;
    } catch (e: unknown) { 
      return AuthMessages.INTERNAL_SERVER_ERROR;
    }
  }

  public async handleMe(id: string) {
    try {
      const findUser: object | null = await this.repository.findById(id);
      if (!findUser) return AuthMessages.USER_NOT_EXISTS;

      return findUser;
    } catch (e: unknown) {
      return AuthMessages.INTERNAL_SERVER_ERROR;
    }
  }
}