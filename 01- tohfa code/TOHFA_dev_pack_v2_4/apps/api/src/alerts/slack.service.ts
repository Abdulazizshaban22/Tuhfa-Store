import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackAlertsService {
  private url = process.env.SLACK_WEBHOOK_URL || '';

  async notify(text: string) {
    if (!this.url) return;
    try {
      await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
    } catch (e) {
      // ignore
    }
  }
}
