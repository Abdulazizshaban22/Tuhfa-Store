import { Controller, Get, Query } from '@nestjs/common';
import { FlagsService } from './flags.service';

@Controller('admin/flags')
export class FlagsController {
  constructor(private flags: FlagsService) {}

  @Get()
  list() { return this.flags.snapshot(); }

  @Get('check')
  check(@Query('k') k: string) { return { key: k, enabled: this.flags.enabled(k) }; }
}
