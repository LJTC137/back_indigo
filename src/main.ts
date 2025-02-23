import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || 8080;

  // Servir archivos estáticos ANTES de levantar el servidor
  const uploadPath = join(process.cwd(), 'uploads');
  app.useStaticAssets(uploadPath, { prefix: '/uploads' });

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: false,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(port);
}
bootstrap();
