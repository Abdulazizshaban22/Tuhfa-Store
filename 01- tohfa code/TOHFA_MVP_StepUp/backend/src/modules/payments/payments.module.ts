import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SplService } from './spl.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, SplService],
})
export class PaymentsModule {}
