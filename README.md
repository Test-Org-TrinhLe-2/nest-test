# NestJS + Vercel Starter

Dự án NestJS cơ bản với cronjob, sẵn sàng deploy lên Vercel.

## Cấu trúc dự án

```
├── api/
│   └── index.ts          # Vercel serverless entry point
├── src/
│   ├── tasks/
│   │   └── tasks.service.ts  # Cronjob service
│   ├── app.controller.ts
│   ├── app.module.ts         # Đã tích hợp ScheduleModule
│   ├── app.service.ts
│   └── main.ts
├── vercel.json               # Cấu hình Vercel
└── package.json
```

## Cài đặt & Chạy local

```bash
npm install --legacy-peer-deps
npm run start:dev
```

## Cronjob

File [`src/tasks/tasks.service.ts`](src/tasks/tasks.service.ts) có 2 ví dụ:

| Cronjob | Lịch chạy | Mô tả |
|---------|-----------|-------|
| `handleEveryMinute` | `* * * * *` | Mỗi phút |
| `handleDailyMorning` | `0 8 * * *` | 8:00 sáng mỗi ngày |

Thêm cronjob mới bằng cách thêm method với decorator `@Cron()` vào `TasksService`.

## Deploy lên Vercel

> [!IMPORTANT]
> Vercel là nền tảng **serverless** — cronjob `@nestjs/schedule` sẽ **không chạy liên tục** vì function sẽ sleep sau mỗi request. Để chạy cronjob thực sự trên Vercel, dùng **Vercel Cron Jobs** (xem bên dưới).

### Bước 1: Cài Vercel CLI

```bash
npm i -g vercel
```

### Bước 2: Login & Deploy

```bash
vercel login
vercel
```

### Bước 3: Deploy production

```bash
vercel --prod
```

### Dùng Vercel Cron Jobs (khuyến nghị cho cronjob)

Thêm vào `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily",
      "schedule": "0 1 * * *"
    }
  ]
}
```

Và tạo endpoint `GET /cron/daily` trong NestJS để Vercel gọi theo lịch.

## Scripts

| Lệnh | Mô tả |
|------|-------|
| `npm run start:dev` | Chạy development (watch mode) |
| `npm run build` | Build production |
| `npm run start:prod` | Chạy bản production |
| `npm test` | Chạy unit tests |
