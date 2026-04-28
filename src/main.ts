import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import { UsersExceptionFilter } from '@users/presentation/filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new UsersExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
