import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RecipesModule } from '@recipes/recipes.module';
import { RecipesExceptionFilter } from '@recipes/presentation/filters';
import { ValidationPipe } from '@nestjs/common';
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RecipesModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
      queue: 'recipes_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RecipesExceptionFilter());

  await app.listen();
  console.log('Recipes Microservice is listening');
}
bootstrap();
