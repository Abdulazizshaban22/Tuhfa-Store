import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { countErrorsSince } from '../metrics/errors.buffer';
import { SlackAlertsService } from '../alerts/slack.service';

@Injectable()
export class MetricsAlertsJob {
  private logger = new Logger(MetricsAlertsJob.name);
  constructor(private slack: SlackAlertsService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async check() {
    const last1m = countErrorsSince(60 * 1000);
    const last5m = countErrorsSince(5 * 60 * 1000);

    if (last1m >= 5) {
      await this.slack.notify(`🚨 High 5xx rate: ${last1m} errors in last 1m`);
    } else if (last5m >= 20) {
      await this.slack.notify(`⚠️ Elevated 5xx rate: ${last5m} errors in last 5m`);
    }
  }
}
