import { Injectable, UseGuards } from "@nestjs/common";

import { AppsRepository } from "../repository/apps.repository";
import { AppsCreateDto } from "../dto/apps.dto";

@Injectable()
export class AppService { 
  constructor (
    private repository: AppsRepository
  ) {}

  public async createApplication(data: AppsCreateDto, userId: any) {
    return this.repository.createApplication(data, userId);
  }

  public async listApplications(userId: string) {
    return this.repository.listApplications(userId);
  }

  public async deleteApplication(userId: string, appId: string) {
    return this.repository.deleteApplication(userId, appId);
  }

  public async updateApplication(data: any) { 
    return this.repository.updateApplication(data);
  }
}