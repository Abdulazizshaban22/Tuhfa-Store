import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

type FlagValue = boolean | string | number;
type Flags = Record<string, FlagValue>;

@Injectable()
export class FlagsService {
  private flags: Flags = {};

  constructor() { this.load(); setInterval(()=>this.load(), 10000).unref(); }

  private load() {
    try {
      const env = process.env.FEATURE_FLAGS || '';
      if (env) { this.flags = JSON.parse(env); return; }
      const path = process.env.FEATURE_FLAGS_FILE || 'ops/flags.json';
      if (fs.existsSync(path)) {
        this.flags = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return;
      }
      this.flags = {};
    } catch {}
  }

  enabled(k: string) {
    const v = this.flags[k];
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (typeof v === 'string') return ['1','true','on','yes','enabled'].includes(v.toLowerCase());
    return false;
  }

  snapshot() { return { ...this.flags }; }
}
