import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: (process.env.CORS_ORIGINS || '').split(',').map(s=>s.trim()).filter(Boolean) || true,
    credentials: true,
  });
  const port = process.env.PORT || 4000;
  await app.listen(port as number);
  console.log(`API running on http://localhost:${port}`);
}
bootstrap();
