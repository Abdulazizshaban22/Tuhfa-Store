import { Controller, Post, Headers, Body, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('webhooks')
export class WebhooksController {
  @Post('stripe')
  stripe(@Headers() headers: any, @Body() body: any, @Res() res: Response) {
    // TODO: verify signature per Stripe docs before trusting
    console.log('Stripe webhook', headers['stripe-signature']);
    res.status(200).send({ ok: true });
  }

  @Post('tap')
  tap(@Body() body: any, @Res() res: Response) {
    // TODO: verify payload per Tap docs
    console.log('Tap webhook', body?.id);
    res.status(200).send({ ok: true });
  }
}
