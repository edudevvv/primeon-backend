import "dotenv/config";

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { ResponseInterceptor } from "./common/utils/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();