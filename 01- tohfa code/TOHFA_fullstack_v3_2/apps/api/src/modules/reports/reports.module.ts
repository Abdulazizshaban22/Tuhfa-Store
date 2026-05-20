import { Module } from '@nestjs/common';
import { SalesPdfController } from './sales.pdf.controller';
@Module({ controllers: [SalesPdfController] })
export class ReportsModule {}
