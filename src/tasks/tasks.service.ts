import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  /**
   * Cronjob chạy mỗi phút một lần
   * CronExpression.EVERY_MINUTE = '* * * * *'
   */
  @Cron(CronExpression.EVERY_MINUTE)
  public handleEveryMinute() {
    this.logger.log(`[${new Date().toISOString()}] Cronjob chạy mỗi phút`);
  }

  /**
   * Cronjob chạy lúc 8:00 sáng mỗi ngày (UTC+7 = 01:00 UTC)
   * Cron expression local: '0 8 * * *' | Vercel UTC: '0 1 * * *'
   */
  @Cron('0 1 * * *', { name: 'dailyMorningTask' })
  public handleDailyMorning() {
    this.logger.log(`[${new Date().toISOString()}] Cronjob chạy lúc 8:00 sáng hàng ngày`);
    // TODO: Thêm logic nghiệp vụ ở đây (gửi email, đồng bộ dữ liệu, v.v.)
  }
}
