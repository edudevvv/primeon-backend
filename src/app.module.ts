import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { AppsModule } from './apps/apps.module';
import { WebhookModule } from './webhook/webhook.module';
import { FlowsModule } from './flows/flows.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    AuthModule, 
    AppsModule,
    FlowsModule,
    WebhookModule
  ]
})
 
export class AppModule {}