import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('admin')
export class AdminAdvancedController {
  private prisma = new PrismaClient();

  async audit(req: any, action: string, meta?: any) {
    try {
      await this.prisma.auditLog.create({
        data: {
          action,
          actorId: req.user?.id || null,
          actorName: req.user?.name || null,
          ip: req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || null,
          path: req.originalUrl || req.url,
          meta,
        },
      });
    } catch {}
  }

  @Get('webhooks')
  async list(@Req() req: any, @Query() q: any) {
    const {
      provider, status, type, from, to, hasOrder, qtext, limit = '50'
    } = q;
    const take = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);

    const where: any = {};
    if (provider) where.provider = provider;
    if (status) where.status = status;
    if (type) where.type = { contains: type, mode: 'insensitive' };
    if (hasOrder === '1') where.orderId = { not: null };
    if (from || to) {
      where.receivedAt = {};
      if (from) where.receivedAt.gte = new Date(from);
      if (to) where.receivedAt.lte = new Date(to);
    }
    if (qtext) {
      // basic OR across few string fields; JSON payload searching kept out (DB-specific)
      where.OR = [
        { deliveryId: { contains: qtext, mode: 'insensitive' } },
        { type: { contains: qtext, mode: 'insensitive' } },
        { signature: { contains: qtext, mode: 'insensitive' } },
      ];
    }

    const rows = await this.prisma.webhookEvent.findMany({
      where,
      orderBy: { receivedAt: 'desc' },
      take,
      select: { id: true, provider: true, type: true, status: true, attemptCount: true, deliveryId: true, orderId: true, receivedAt: true },
    });

    await this.audit(req, 'admin.webhooks.list', { where, count: rows.length });
    return rows;
  }

  @Get('webhooks/:id')
  async details(@Req() req: any, @Param('id') id: string) {
    const ev = await this.prisma.webhookEvent.findUnique({ where: { id } });
    await this.audit(req, 'admin.webhooks.details', { id });
    return ev || { ok: false, error: 'not_found' };
  }

  @Get('reports/sales.pdf')
  async salesPdf(@Req() req: any) {
    // Simple report: totals per day
    const orders = await this.prisma.$queryRawUnsafe(`
      SELECT date_trunc('day', "createdAt") AS day,
             COUNT(*) AS orders_count,
             SUM("totalCents")/100.0 AS total_sar
      FROM "Order"
      GROUP BY 1
      ORDER BY 1 DESC
      LIMIT 30
    `);

    // Build PDF with pdfkit
    const PDFDocument = (await import('pdfkit')).default || (await import('pdfkit'));
    const doc = new (PDFDocument as any)({ size: 'A4', margin: 40 });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    const done = new Promise<Buffer>((resolve) => doc.on('end', () => resolve(Buffer.concat(chunks))));

    doc.fontSize(18).text('TOHFA — Sales Report (Last 30 Days)', { align: 'center' });
    doc.moveDown().fontSize(10).text('Generated at: ' + new Date().toISOString());
    doc.moveDown();

    // table header
    doc.fontSize(12).text('Day', 40, doc.y, { continued: true, width: 200 });
    doc.text('Orders', 240, doc.y, { continued: true, width: 100 });
    doc.text('Total (SAR)', 340, doc.y, { width: 200 });
    doc.moveDown();

    for (const r of (orders as any[])) {
      const day = new Date(r.day).toISOString().slice(0,10);
      doc.text(day, 40, doc.y, { continued: true, width: 200 });
      doc.text(String(r.orders_count), 240, doc.y, { continued: true, width: 100 });
      doc.text(String(r.total_sar), 340, doc.y, { width: 200 });
      doc.moveDown(0.5);
    }

    doc.end();
    const pdf = await done;
    await this.audit(req, 'admin.reports.sales.pdf');
    return {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="sales.pdf"',
      },
      body: pdf.toString('base64'),
      isBase64Encoded: true,
    } as any;
  }
}
