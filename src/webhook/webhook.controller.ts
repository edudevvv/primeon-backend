import { Body, Controller, Get, Post, Query, Response } from "@nestjs/common";

import { WebhookService } from "./service/webhook.service";
import { Response as Res } from "express";


@Controller({ path: "webhook" })
export class WebhookController {
  constructor (
    private service: WebhookService
  ) {}

  @Get()
  public async handleWebhook(
    @Query("hub.mode") mode: string, 
    @Query("hub.verify_token") token: string, 
    @Query("hub.challenge") challenge: string, 
    @Response() res: Res
  ) {
    return this.service.handleWebhook({ mode, token, challenge }, res);
  }

  @Post()
  public async handlePostWebhook(
    @Query("hub.mode") mode: string, 
    @Query("hub.verify_token") token: string, 
    @Query("hub.challenge") challenge: string, 
    @Body() data: any,
    @Response() res: Res
  ) {
    return this.service.handlePostWebhook({ mode, token, challenge }, data, res);
  }
} 