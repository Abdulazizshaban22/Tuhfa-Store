import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AiService {
  private base = process.env.AI_BASE || 'http://ai:8001';
  async embed(texts: string[]) {
    const res = await fetch(this.base + '/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts }),
    });
    return await res.json();
  }
}
