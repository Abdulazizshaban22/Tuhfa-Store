import { Controller, Get, Param } from '@nestjs/common';
import { ArtisansService } from './artisans.service';
@Controller('artisans') export class ArtisansController {
  constructor(private readonly svc: ArtisansService) {}
  @Get() list(){ return this.svc.list(); }
  @Get('handle/:handle') get(@Param('handle') handle: string){ return this.svc.getByHandle(handle); }
}
