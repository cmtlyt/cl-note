import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LOGGER_TOKEN } from '@lib/logger';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useLogger(app.get(LOGGER_TOKEN));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const docConfig = new DocumentBuilder()
    .setTitle('cl-note')
    .setDescription('记账系统 API 文档')
    .setVersion('0.1')
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: '用户名 + 密码',
    })
    .addCookieAuth('sid', {
      type: 'apiKey',
      name: 'cookie',
      description: '基于 cookie 的认证',
    })
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 的认证',
      name: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app as any, docConfig);
  SwaggerModule.setup('doc', app as any, document);

  await app.listen(app.get(ConfigService).get('app.port'));
}
bootstrap();
