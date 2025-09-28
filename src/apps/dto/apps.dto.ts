import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class AppsCreateDto { 
  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsEnum(["WABA", "BALLEYS"]) @IsNotEmpty()
  type: string;

  @IsString() @IsNotEmpty()
  number: string;
}

export class AppsUpdateDto {
  @IsString()
  wabaId: string;
  
  @IsString() @IsNotEmpty()
  wabaToken: string;
}