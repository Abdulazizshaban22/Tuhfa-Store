import { Controller, Post, Headers, Body, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('webhooks')
export class WebhooksController {
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
}
