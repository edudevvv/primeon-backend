import { Module } from "@nestjs/common";

import { FlowsController } from "./flows.controller";
import { FlowsRepository } from "./repository/flows.respository";
import { FlowsService } from "./service/flows.service";
import { PrismaService } from "src/common/prisma/prisma.service";


@Module({ 
  controllers: [FlowsController],
  providers: [FlowsRepository, FlowsService, PrismaService]
})
export class FlowsModule {}