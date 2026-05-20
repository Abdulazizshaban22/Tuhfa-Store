import { Controller, Get, Param } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';

@Controller('exhibits')
export class ExhibitsController {
  constructor(private readonly svc: ExhibitsService) {}
  @Get()
  list(){ return this.svc.list(); }
  @Get(':externalId')
  get(@Param('externalId') externalId: string){ return this.svc.getByExternalId(externalId); }
}
