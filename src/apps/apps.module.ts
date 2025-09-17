import { Module } from "@nestjs/common";

import { AppsController } from "./apps.controller";
import { PrismaService } from "../common/prisma/prisma.service";

import { AppsRepository } from "./repository/apps.repository";
import { AppService } from "./service/apps.service";

@Module({ 
  controllers: [AppsController],
  providers: [AppsRepository, AppService, PrismaService]
})

export class AppsModule {}