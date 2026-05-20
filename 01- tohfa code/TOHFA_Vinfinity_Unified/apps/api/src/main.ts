import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: (process.env.CORS_ORIGINS||'*').split(',') });
  await app.listen(process.env.PORT || 4000);
  console.log('API up on port', process.env.PORT || 4000);
}
bootstrap();
