import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class WhatsAppService { 
  private api: AxiosInstance;

  constructor () {
    this.api = axios.create({ 
      baseURL: "https://graph.facebook.com/v22.0",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.46.1"
      }
    });
  }

  public async validateToken(token: string) {
    try { 
      const { data } = await this.api({ 
        method: "GET",
        url: `/debug_token?input_token=${token}`,
        headers: { "Authorization": `Bearer ${token}` }
      });

      console.log(data)
    } catch (e: unknown) { 
      console.log(e)
      return null;
    }
  }
}