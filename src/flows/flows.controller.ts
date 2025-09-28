import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";

import { FlowsService } from "./service/flows.service";
import { FlowsDto } from "./dto/flows.dto";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";

@Controller({ path: "flows", version: "1" })
@UseGuards(JwtAuthGuard)
export class FlowsController { 
  constructor (
    private service: FlowsService
  ) {}

  @Post(":appId/create") 
  async handleCreateFlow(
    @Body() data: FlowsDto, 
    @Param("appId") appId: string, 
    @Request() req: any
  ) {
    return this.service.createFlow(data, appId, req.user.userId);
  }

  
  @Get(":appId") 
  async handleListFlow(
    @Param("appId") appId: string, 
    @Request() req: any
  ) {
    return this.service.getFlows(appId, req.user.userId);
  }
}