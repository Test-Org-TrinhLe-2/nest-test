import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

console.log('Node.js runtime version:', process.version);

let app: any;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((origin) => origin.trim().replace(/\/+$/, ''))
      .filter(Boolean);

    app.enableCors({
      origin: (origin: any, callback: any) => {
        const normalizedOrigin = origin?.replace(/\/+$/, '');
        const isAllowed =
          !normalizedOrigin || allowedOrigins.includes(normalizedOrigin);
        if (isAllowed) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true,
    });
    await app.init();
  }
  return app;
}

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
  console.log('Node.js runtime version:', process.version);

  const nestApp = await createApp();
  const httpAdapter = nestApp.getHttpAdapter();
  httpAdapter.getInstance()(req, res);
}
