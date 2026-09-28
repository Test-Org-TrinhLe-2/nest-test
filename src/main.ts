import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

let app: any;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  return app;
}
// mock 1
// Chạy local (nest start / nest start --watch)
// Vercel tự set VERCEL=1 nên block này sẽ không chạy trên production
if (!process.env.VERCEL) {
  const nestApp = await createApp();
  const port = process.env.PORT ?? 3000;
  await nestApp.listen(port);
  console.log(`Application is running on port ${port}`);
}

// Export handler cho Vercel Serverless (@vercel/node)
export default async function handler(req: any, res: any) {
  const nestApp = await createApp();
  const httpAdapter = nestApp.getHttpAdapter();
  httpAdapter.getInstance()(req, res);
}
