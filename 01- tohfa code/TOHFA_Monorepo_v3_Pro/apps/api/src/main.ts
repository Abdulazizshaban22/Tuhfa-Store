import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean) || true, credentials: true });
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 4000);
  console.log('API on http://localhost:'+ (process.env.PORT || 4000));
}
bootstrap();
