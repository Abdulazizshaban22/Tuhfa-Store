import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class NotifierService {
  async slack(text: string, blocks?: any[]) {
    const url = process.env.SLACK_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL_APP;
    if (!url) return { ok: false, reason: 'No webhook configured' };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blocks ? { text, blocks } : { text })
      });
      return { ok: res.ok };
    } catch (e:any) {
      return { ok: false, error: e?.message || String(e) };
    }
  }
}
