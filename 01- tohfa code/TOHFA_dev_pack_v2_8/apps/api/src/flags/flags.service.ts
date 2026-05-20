import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

type FlagValue = boolean | string | number;
type FlagsDict = Record<string, FlagValue>;

@Injectable()
export class FlagsService {
  private flags: FlagsDict = {};

  constructor() {
    this.load();
    setInterval(() => this.load(), 10000).unref(); // reload every 10s (lightweight)
  }

  private load() {
    try {
      // Priority: ENV JSON -> file -> empty
      const env = process.env.FEATURE_FLAGS || '';
      if (env) {
        this.flags = JSON.parse(env);
        return;
      }
      const path = process.env.FEATURE_FLAGS_FILE || 'ops/flags.json';
      if (fs.existsSync(path)) {
        const content = fs.readFileSync(path, 'utf-8');
        this.flags = JSON.parse(content);
        return;
      }
      this.flags = {};
    } catch {
      // Keep last good
    }
  }

  get(key: string, fallback?: FlagValue): FlagValue {
    return Object.prototype.hasOwnProperty.call(this.flags, key) ? this.flags[key] : (fallback as any);
  }

  enabled(key: string): boolean {
    const v = this.get(key, false);
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (typeof v === 'string') return ['1','true','on','yes','enabled'].includes(v.toLowerCase());
    return false;
  }

  snapshot() {
    return { ...this.flags };
  }
}
