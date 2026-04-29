import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FollowsModule } from '@follows/follows.module';
import { FollowsExceptionFilter } from '@follows/presentation/filters';
import { ValidationPipe } from '@nestjs/common';
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FollowsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
      queue: 'follows_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FollowsExceptionFilter());

  await app.listen();
  console.log('Follows Microservice is listening');
}
bootstrap();
