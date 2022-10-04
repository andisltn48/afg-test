import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { appendFile } from 'fs';
import { AppModule } from './app.module';
import * as express from "express";

async function bootstrap() {
  const http = await NestFactory.create(AppModule);
  http.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
  })
  await http.listen(3000);
}
bootstrap();
