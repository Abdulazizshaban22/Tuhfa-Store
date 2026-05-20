import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { json, urlencoded } from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(cors({ origin: true, credentials: true }));
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
  console.log('TOHFA API running on ' + (process.env.PORT || 3001));
}
bootstrap();
