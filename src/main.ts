import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  // Server port
  const port = +configService.get<number>(SERVER_PORT) || 8080;
  await app.listen(port);
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Prefijo para las rutas de acceso
  });
  console.log(`listening on port ${await app.getUrl()}`);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //data basura
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}
bootstrap();
