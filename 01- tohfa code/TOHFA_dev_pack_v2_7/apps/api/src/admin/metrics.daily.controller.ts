import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('admin/metrics')
export class AdminMetricsController {
  private prisma = new PrismaClient();

  @Get('daily')
  async daily() {
    const rows: any = await this.prisma.$queryRawUnsafe(`
      with days as (
        select generate_series(current_date - interval '13 day', current_date, interval '1 day')::date as day
      )
      select
        d.day,
        coalesce(p.paid,0) as paid,
        coalesce(w.failed,0) as webhooks_failed
      from days d
      left join (
        select date_trunc('day', "createdAt")::date as day, count(*) as paid
        from "Order" where status='paid'
        group by 1
      ) p on p.day = d.day
      left join (
        select date_trunc('day', "receivedAt")::date as day, count(*) as failed
        from "WebhookEvent" where status='failed'
        group by 1
      ) w on w.day = d.day
      order by d.day asc;
    `);
    return { items: rows };
  }
}
