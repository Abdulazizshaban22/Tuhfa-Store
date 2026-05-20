import { Controller, Post, Headers, Body, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { NotifierService } from '../notifier/notifier.service';

@Controller('webhooks')
export class WebhooksController {
  private prisma = new PrismaClient();
  constructor(private notifier: NotifierService) {}

  @Post('stripe')
  stripe(@Headers() headers: any, @Body() body: any, @Res() res: Response) {
    console.log('Stripe webhook', headers['stripe-signature']);
    res.status(200).send({ ok: true });
  }

  @Post('tap')
  tap(@Body() body: any, @Res() res: Response) {
    console.log('Tap webhook', body?.id);
    res.status(200).send({ ok: true });
  }

  @Post('unified')
  async unified(@Req() req: Request, @Res() res: Response) {
    const provider = String(req.headers['x-provider'] || 'unknown');
    const eventType = String(req.headers['x-event-type'] || (req.body?.type || 'unknown'));
    await this.prisma.webhookEvent.create({ data: { provider, status: 'received', payload: req.body } });
    await this.notifier.slack(`🔔 Webhook(${provider}) — ${eventType}`);
    res.status(200).send({ ok: true });
  }
}
