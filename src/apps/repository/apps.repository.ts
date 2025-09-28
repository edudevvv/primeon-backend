import { Injectable } from "@nestjs/common";

import { AppsCreateDto } from "../dto/apps.dto";
import { AuthMessages, AppsMessages } from "../../common/constants/messages";
import { PrismaService } from "../../common/prisma/prisma.service";
import { WhatsAppService } from "../../whatsapp/whatsapp.service";

@Injectable()
export class AppsRepository { 
  constructor (
    private prisma: PrismaService,
    private whatsapp: WhatsAppService
  ) {}

  private async findUserById(id: string) {
    try { 
      const user: object | null = await this.prisma.users.findUnique({ where: { id }, omit: { deletedAt: true, passwordHashed: true } });
      return user;
    } catch (e: unknown) {
      return null;
    }
  }
  
  public async findById(id: string) { 
    try { 
      const application: object | null = await this.prisma.applications.findUnique({ where: { id, deletedAt: null }, omit: { deletedAt: true, ownerId: true } });
      return application;
    } catch (e: unknown) {
      return null;
    }
  }

  public async createApplication(data: AppsCreateDto, userId: string) { 
    try { 
      const user: any = await this.findUserById(userId);
      if (!user) return AuthMessages.USER_NOT_EXISTS;
      if (user.appsLimit === 0) return AppsMessages.LIMIT_EXCEEDED;

      await this.prisma.users.update({ 
        where: { id: userId },
        data: { 
          appsLimit: { decrement: 1 } 
        }
      });

      const applications: object = await this.prisma.applications.create({ 
        data: { 
          name: data.name.replace(" ", "-"),
          type: data.type === "WABA" ? "WABA" : "BALLEYS",
          ownerId: userId,

          config: { 
            create: { 
              wabaNumber: data.number
            },
          }
        },
        omit: { ownerId: true, deletedAt: true },
        include: { config: { omit: { deletedAt: true, applicationId: true } } }
      });

      return applications;
    } catch (e: unknown) { 
      return AppsMessages.INTERNAL_SERVER_ERROR;
    }
  }
  
  public async listApplications(userId: string) { 
    try { 
      const user: any = await this.findUserById(userId);
      if (!user) return AuthMessages.USER_NOT_EXISTS;

      const applications: object = await this.prisma.applications.findMany({ 
        where: { 
          ownerId: userId,
          deletedAt: null
        },
        include: { config: { omit: { deletedAt: true, applicationId: true  } } },
        omit: { deletedAt: true, ownerId: true }
      });

      return applications;
    } catch (e: unknown) {
      return null;
    }
  }

  public async deleteApplication(userId: string, appId: string) {
    try {   
      const user: any = await this.findUserById(userId);
      if (!user) return AuthMessages.USER_NOT_EXISTS;

      await this.prisma.users.update({ 
        where: { id: userId },
        data: { 
          appsLimit: { increment: 1 } 
        }
      });

      const application: object | null = await this.prisma.applications.findUnique({ 
        where: { 
          id: appId,
          ownerId: userId,
          deletedAt: null
        }
      });

      if (!application) return AppsMessages.INVALID_APPLICATION;
      await this.prisma.applicationConfig.update({ 
        where: { applicationId: appId },
        data: { deletedAt: new Date() }
      });

      await this.prisma.applications.update({ 
        where: { id: appId },
        data: { deletedAt: new Date() }
      });

      return AppsMessages.APPLICATION_DELETED_SUCCESSFULLY;
    } catch (e: unknown) { 
      return AppsMessages.INTERNAL_SERVER_ERROR;
    }
  }

  public async updateApplication(data: any) {
    try { 
      const { wabaId, wabaToken } = data;

      const response = await this.whatsapp.validateToken(wabaToken);
      if (!response) return AppsMessages.TOKEN_INVALID;
      console.log(response)
    } catch (e: unknown) { 
      return null;
    }
    console.log(data)
  }
}