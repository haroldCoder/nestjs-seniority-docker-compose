import { Module } from '@nestjs/common';
import { PrismaService } from '@core/infrastructure/db/prisma/client';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { UserController } from './presentation/controllers';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    GetUsersUseCase,
  ],
  exports: [UserRepository],
})
export class UsersModule { }
