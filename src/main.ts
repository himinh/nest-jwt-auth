import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import { refreshSecret } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const refreshSecret = configService.get('REFRESH_SECRET');
  const port = configService.get('PORT');
  app.use(helmet());
  app.enableCors({
    credentials: true,
  });

  app.use(cookieParser(refreshSecret));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API - Practice Exercise 1')
    .setDescription('25 API in practice exercise 1')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, doc);

  await app.listen(port);
}
bootstrap();
