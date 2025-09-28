import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";

import { AppsCreateDto, AppsUpdateDto } from "./dto/apps.dto";
import { AppService } from "./service/apps.service";
import { JwtAuthGuard } from "../auth/guards/auth.guard";

@Controller({ path: "apps", version: "1" })
@UseGuards(JwtAuthGuard)
export class AppsController { 
  constructor (
    private service: AppService
  ) {}

  @Post("create")
  public async handleCreateApplication(
    @Body() data: AppsCreateDto, 
    @Request() req: any
  ) {
    return this.service.createApplication(data, req.user.userId);
  }

  @Get("list")
  public async handleListApplication(@Request() req: any) {
    return this.service.listApplications(req.user.userId);
  }

  @Delete(":appId")
  public async handleDeleteApplication(@Param('appId') appId: string, @Request() req: any) {
    return this.service.deleteApplication(req.user.userId, appId);
  }

  @Put(":appId/config")
  async handleUpdateApplication(@Body() data: AppsUpdateDto) {
    return this.service.updateApplication(data);
  }
}