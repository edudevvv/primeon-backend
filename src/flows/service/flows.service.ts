import { Injectable } from "@nestjs/common";

import { FlowsRepository } from "../repository/flows.respository";
import { FlowsDto } from "../dto/flows.dto";

@Injectable()
export class FlowsService { 
  constructor (
    private repository: FlowsRepository
  ) {}

  async createFlow(data: FlowsDto, appId: string, userId: string) { 
    try { 
      const application = await this.repository.findApplicationById(appId);
      if (application?.ownerId !== userId) return false;
      
    
      const flow = await this.repository.createFlow(data, appId);
      return { message: "Flow created successfully", flow };
      console.log(data, appId, userId)
    } catch (e: unknown) { 

    }
  }

  async getFlows(appId: string, userId: string) { 
    try { 
      const application = await this.repository.findApplicationById(appId);
      if (application?.ownerId !== userId) return false;
      
    
      const flows = await this.repository.getFlows(appId);
      return { message: "Flows listed successfully", flows }
    } catch (e: unknown) { 

    }
  }
}