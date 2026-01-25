import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Manual CORS handling
  app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.header('Origin');
    if (origin) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Accept, X-Requested-With',
    );

    if (req.method === 'OPTIONS') {
      return res.status(200).send();
    }
    next();
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const uploadDir =
    process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadDir));

  // Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('Aceroyal Estates API')
    .setDescription('REST API for Aceroyal Estates real estate platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Properties', 'Property management')
    .addTag('Blog', 'Blog posts')
    .addTag('Common', 'Public endpoints (FAQs, Offices, etc.)')
    .addTag('Admin', 'Admin-only endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 API running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(
    `📚 Swagger docs at http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}
bootstrap();
