import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksService } from './tasks/tasks.service.js';
import { CronController } from './cron/cron.controller.js';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Kích hoạt hỗ trợ cronjob
  ],
  controllers: [AppController, CronController],
  providers: [AppService, TasksService],
})
export class AppModule {}
