import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TapService } from './tap.service';
import { ApsService } from './aps.service';

@Module({ controllers:[PaymentsController], providers:[PaymentsService, TapService, ApsService] })
export class PaymentsModule {}
