import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMessage() {
    return {
      feat: 1,
      message: 'Xin chào từ NestJS API!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
