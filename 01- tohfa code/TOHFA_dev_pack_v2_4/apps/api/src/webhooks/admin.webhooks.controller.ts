import { Controller, Get, Query } from '@nestjs/common';
import { WebhookEventsService } from './events.service';

@Controller('admin/webhooks')
export class AdminWebhooksController {
  constructor(private svc: WebhookEventsService) {}

  @Get()
  async list(@Query('limit') limit?: string) {
    const n = Math.min(Math.max(parseInt(limit || '50', 10), 1), 200);
    return this.svc.list(n);
  }
}
