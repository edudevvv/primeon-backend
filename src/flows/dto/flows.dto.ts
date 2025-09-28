import { Injectable } from "@nestjs/common";
import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";

interface ISteps {
  aliases: string[]
  next: string
}

@Injectable()
export class FlowsDto { 
  @IsString() @IsNotEmpty()
  name: string;

  @IsArray() @IsNotEmpty()
  message: object[];

  @IsBoolean() 
  isInitial: boolean;

  @IsArray() @IsNotEmpty()
  steps: ISteps[]
}