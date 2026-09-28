import { Controller, Get, Logger } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service.js';

/**
 * CronController - các endpoint được Vercel Cron Jobs gọi theo lịch.
 * Vercel sẽ gửi GET request tới các path này đúng theo schedule trong vercel.json.
 */
@Controller('cron')
export class CronController {
  private readonly logger = new Logger(CronController.name);

  constructor(private readonly tasksService: TasksService) {}

  /**
   * GET /cron/every-minute
   * Được Vercel gọi mỗi phút (schedule: "* * * * *")
   */
  @Get('every-minute')
  handleEveryMinute() {
    this.logger.log('Vercel Cron: /cron/every-minute được gọi');
    this.tasksService.handleEveryMinute();
    return { ok: true, job: 'every-minute', timestamp: new Date().toISOString() };
  }

  /**
   * GET /cron/daily-morning
   * Được Vercel gọi lúc 8:00 sáng (UTC+7 = 01:00 UTC, schedule: "0 1 * * *")
   */
  @Get('daily-morning')
  handleDailyMorning() {
    this.logger.log('Vercel Cron: /cron/daily-morning được gọi');
    this.tasksService.handleDailyMorning();
    return { ok: true, job: 'daily-morning', timestamp: new Date().toISOString() };
  }
}
