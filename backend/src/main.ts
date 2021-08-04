import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as ffmpeg from "fluent-ffmpeg"
import * as ffmpegPath from "@ffmpeg-installer/ffmpeg"
import { AppModule } from './app.module';
import { join } from 'path';
ffmpeg.setFfmpegPath(ffmpegPath.path)


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(8888);
}
bootstrap();
