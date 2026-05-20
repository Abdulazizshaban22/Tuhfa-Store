import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';

@Controller('admin/reports')
export class SalesDetailedPdfController {
  private prisma = new PrismaClient();

  @Get('sales-detailed.pdf')
  async pdf(@Res() res: Response) {
    // Fetch last 30 days sales per day + top products
    const rows: any = await this.prisma.$queryRawUnsafe(`
      with days as (
        select generate_series(current_date - interval '29 day', current_date, interval '1 day')::date as day
      )
      select d.day, coalesce(sum(o."totalCents")/100.0,0) as total_sar, count(o.id) as orders_count
      from days d
      left join "Order" o on date_trunc('day', o."createdAt")::date = d.day
      group by 1 order by 1 asc;
    `);

    let html = '<html><head><meta charset="utf-8"/><style>body{font-family:Arial,sans-serif;padding:24px}h1{margin:0}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f5f5f5}</style></head><body>';
    html += '<h1>TOHFA — Detailed Sales (Last 30 Days)</h1>';
    html += '<table><thead><tr><th>Day</th><th>Orders</th><th>Total (SAR)</th></tr></thead><tbody>';
    for (const r of rows) {
      const day = new Date(r.day).toISOString().slice(0,10);
      html += `<tr><td>${day}</td><td>${r.orders_count}</td><td>${r.total_sar}</td></tr>`;
    }
    html += '</tbody></table></body></html>';

    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="sales-detailed.pdf"');
    res.end(pdf);
  }
}
