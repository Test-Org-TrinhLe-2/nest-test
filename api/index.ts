import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';

// Entry point cho Vercel Serverless Function
let app: any;

async function getApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const nestApp = await getApp();
  const httpAdapter = nestApp.getHttpAdapter();
  // Chuyển request từ Vercel sang Express handler của NestJS
  httpAdapter.getInstance()(req, res);
}
