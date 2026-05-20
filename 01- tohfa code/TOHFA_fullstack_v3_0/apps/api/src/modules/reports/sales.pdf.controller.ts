import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';

@Controller('admin/reports')
export class SalesPdfController {
  private prisma = new PrismaClient();

  @Get('sales.pdf')
  async pdf(@Res() res: Response) {
    const rows: any = await this.prisma.$queryRawUnsafe(`
      select date_trunc('day', "createdAt")::date as day, count(*) as orders, sum("totalCents")/100.0 as total_sar
      from "Order" group by 1 order by 1 desc limit 30;
    `);
    const doc = new PDFDocument({ margin: 36, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="sales.pdf"');
    doc.pipe(res);
    doc.fontSize(18).text('TOHFA — Sales (Last 30 days)');
    doc.moveDown();
    rows.forEach((r:any)=> doc.fontSize(12).text(`${new Date(r.day).toISOString().slice(0,10)} — Orders: ${r.orders} — SAR ${r.total_sar}`));
    doc.end();
  }
}
