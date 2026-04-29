import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from '@users/users.module';
import { UsersExceptionFilter } from '@users/presentation/filters';
import { ValidationPipe } from '@nestjs/common';
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new UsersExceptionFilter());

  await app.listen();
  console.log('Users Microservice is listening');
}
bootstrap();
