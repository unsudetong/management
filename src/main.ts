import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const httpsOptions: any =
  process.env.NODE_ENV === 'production'
    ? {
        key: fs.readFileSync(
          __dirname + '/../../../../cert/luckydata.domain.key.pem',
          'utf-8',
        ),
        cert: fs.readFileSync(
          __dirname + '/../../../../cert/luckydata.domain.pem',
          'utf-8',
        ),
        ca: fs.readFileSync(
          __dirname + '/../../../../cert/luckydata.domain.ca.pem',
          'utf-8',
        ),
      }
    : undefined;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
