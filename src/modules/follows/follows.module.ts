import { Module } from '@nestjs/common';
import { PrismaService } from '@core/infrastructure/db/prisma/client';
import { FollowRepository } from './domain/repositories';
import { PrismaFollowRepository } from './infrastructure/persistence/prisma';
import {
  FollowUserUseCase,
  UnfollowUserUseCase,
  GetFollowersUseCase,
  GetFollowingUseCase,
} from './application/use-cases';
import { FollowController } from './presentation/controllers';

@Module({
  controllers: [FollowController],
  providers: [
    PrismaService,
    {
      provide: FollowRepository,
      useClass: PrismaFollowRepository,
    },
    FollowUserUseCase,
    UnfollowUserUseCase,
    GetFollowersUseCase,
    GetFollowingUseCase,
  ],
  exports: [FollowRepository],
})
export class FollowsModule { }
