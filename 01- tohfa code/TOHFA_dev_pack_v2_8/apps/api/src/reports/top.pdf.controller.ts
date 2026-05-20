import { Controller, Get, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';

@Controller('admin/reports')
export class TopReportPdfController {
  private prisma = new PrismaClient();

  @Get('top.pdf')
  async pdf(@Res() res: Response, @Query('days') days?: string, @Query('limit') limit?: string) {
    const nDays = Math.max(1, Math.min(parseInt(days || '30', 10), 365));
    const n = Math.max(3, Math.min(parseInt(limit || '10', 10), 100));
    const since = new Date(Date.now() - nDays * 24 * 60 * 60 * 1000);

    // Assumes tables: Order, OrderItem(productId, qty, unitCents), Product(id, name, creatorId?), Creator(id, name?)
    const topProducts: any = await this.prisma.$queryRawUnsafe(`
      SELECT p.id, p.name, COALESCE(SUM(oi."quantity"),0) AS qty, COALESCE(SUM(oi."quantity"*oi."unitCents")/100.0,0) AS total_sar
      FROM "OrderItem" oi
      JOIN "Order" o ON o.id = oi."orderId"
      JOIN "Product" p ON p.id = oi."productId"
      WHERE o."createdAt" >= $1 AND o.status='paid'
      GROUP BY p.id, p.name
      ORDER BY total_sar DESC
      LIMIT $2
    `, since, n);

    const topCreators: any = await this.prisma.$queryRawUnsafe(`
      SELECT c.id, COALESCE(c.name,'Creator') AS name, COALESCE(SUM(oi."quantity"*oi."unitCents")/100.0,0) AS total_sar
      FROM "OrderItem" oi
      JOIN "Order" o ON o.id = oi."orderId"
      JOIN "Product" p ON p.id = oi."productId"
      LEFT JOIN "Creator" c ON c.id = p."creatorId"
      WHERE o."createdAt" >= $1 AND o.status='paid'
      GROUP BY c.id, c.name
      ORDER BY total_sar DESC
      LIMIT $2
    `, since, n);

    let html = `
    <html><head><meta charset="utf-8"/>
    <style>
      body{font-family:Arial,sans-serif;padding:24px}
      h1,h2{margin:0 0 8px 0}
      table{width:100%;border-collapse:collapse;margin-top:12px}
      th,td{border:1px solid #ddd;padding:8px;text-align:left}
      th{background:#f5f5f5}
      .split{display:flex;gap:24px}
      .col{flex:1}
      .muted{color:#666}
    </style></head><body>
      <h1>TOHFA — Top Report (Last ${nDays} Days)</h1>
      <p class="muted">Generated at: ${new Date().toISOString()}</p>
      <div class="split">
        <div class="col">
          <h2>Top Products</h2>
          <table><thead><tr><th>#</th><th>Name</th><th>Qty</th><th>Total (SAR)</th></tr></thead><tbody>`;

    const rows = (arr:any[]) => arr.map((r:any, i:number) => `<tr><td>${i+1}</td><td>${(r.name||r.id)}</td><td>${r.qty||'-'}</td><td>${r.total_sar||0}</td></tr>`).join('');

    html += rows(topProducts || []);
    html += `</tbody></table></div><div class="col"><h2>Top Creators</h2><table><thead><tr><th>#</th><th>Name</th><th>Total (SAR)</th></tr></thead><tbody>`;
    html += (topCreators || []).map((r:any, i:number) => `<tr><td>${i+1}</td><td>${(r.name||r.id)}</td><td>${r.total_sar||0}</td></tr>`).join('');
    html += `</tbody></table></div></div></body></html>`;

    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="top.pdf"');
    res.end(pdf);
  }
}
