import { Injectable } from "@nestjs/common";
import { Applications } from "generated/prisma";
import { PrismaService } from "../../common/prisma/prisma.service";
import { FlowsDto } from "../dto/flows.dto";

@Injectable()
export class FlowsRepository { 
  constructor (
    private prisma: PrismaService
  ) {}

  
  private async findUserById(id: string) {
    try { 
      const user: object | null = await this.prisma.users.findUnique({ where: { id }, omit: { deletedAt: true, passwordHashed: true } });
      return user;
    } catch (e: unknown) {
      return null;
    }
  }
  
  public async findApplicationById(id: string) { 
    try { 
      const application: Applications | null = await this.prisma.applications.findUnique({ where: { id, deletedAt: { equals: null } } });
      return application;
    } catch (e: unknown) {
      return null;
    }
  }

  public async createFlow(data: FlowsDto, appId: string) {
    try {

      const criado = await this.prisma.stepsFlow.create({ 
        data: { 
          applicationId: appId,
          name: data.name,
          message: data.message,
          isInitial: data.isInitial,
          steps: data.steps.map(e => ({ aliases: e.aliases, next: e.next }))
        }
      });

      return criado;
    } catch (e: unknown) {
      console.error(e);
      return null;
    }
  }

  public async getFlows(appId: string) { 
    try { 
      const existingFlow = await this.prisma.applications.findUnique({
        where: { id: appId },
        omit: { 
          id: true,
          name: true,
          createdAt: true,
          deletedAt: true, 
          ownerId: true,
          type: true,
          updatedAt: true
        },
        include: { steps: { 
          omit: { applicationId: true }
        } }
      });

      if (!existingFlow) return [];
      else return existingFlow;
    } catch (e: unknown) { 

    }
  }
}