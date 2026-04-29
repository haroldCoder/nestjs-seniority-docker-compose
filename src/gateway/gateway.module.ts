import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import "dotenv/config";
import { GatewayUsersController } from './controllers/gateway-users.controller';
import { GatewayRecipesController } from './controllers/gateway-recipes.controller';
import { GatewayFollowsController } from './controllers/gateway-follows.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false
          },
        },
      },
      {
        name: 'RECIPES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
          queue: 'recipes_queue',
          queueOptions: {
            durable: false
          },
        },
      },
      {
        name: 'FOLLOWS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672'],
          queue: 'follows_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [
    GatewayUsersController,
    GatewayRecipesController,
    GatewayFollowsController,
  ],
})
export class GatewayModule { }
