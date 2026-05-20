import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { NotifierModule } from '../notifier/notifier.module';
@Module({ imports: [NotifierModule], controllers: [WebhooksController] })
export class WebhooksModule {}
