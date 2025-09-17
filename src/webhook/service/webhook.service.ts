import "dotenv/config";

import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class WebhookService { 
  public async handleWebhook(query: any, response: Response) {
    const { mode, token, challenge } = query;

    if (mode && token) { 
      if (mode === "subscribe" && token === process.env.TOKEN) { 
        return response.status(HttpStatus.OK).send(challenge);
      } else { 
        return response.sendStatus(HttpStatus.FORBIDDEN);
      } 
    } else { 
      return response.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  public async handlePostWebhook(query: any, data: any, response: Response) {
    const { mode, token, challenge } = query;

    if (mode && token && !data.body.object) { 
      if (mode === "subscribe" && token === process.env.TOKEN) { 
        return response.status(HttpStatus.OK).send(challenge);
      } else { 
        return response.sendStatus(HttpStatus.FORBIDDEN);
      } 
    } else { 
      const bodyReceived = data;
     
      if (bodyReceived.object === "whatsapp_business_account") {
        const entry = bodyReceived.entry?.[0];
        const changes = entry?.changes?.[0];
        const message = changes?.value?.messages?.[0];
        const contact = changes?.value?.contacts?.[0];

        if (message && contact) {
          const waId = contact.wa_id;
          const contactName = contact.profile.name;
          const messageText = message.text?.body;

          return response.sendStatus(200);
        } else { 
          return response.sendStatus(200);
        }
      } 
    }
  }

  public async processMessage() { }
}