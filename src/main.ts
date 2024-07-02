import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LOGGER_TOKEN } from '@lib/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useLogger(app.get(LOGGER_TOKEN));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
