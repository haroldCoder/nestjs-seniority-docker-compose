import { Module } from '@nestjs/common';
import { PrismaService } from '@core/infrastructure/db/prisma/client';
import { RecipeRepository } from './domain/repositories';
import { PrismaRecipeRepository } from './infrastructure/persistence/prisma';
import { CreateRecipeUseCase, GetRecipesUseCase, GetRecipeByIdUseCase } from './application/use-cases';
import { RecipeController } from './presentation/controllers';

@Module({
  controllers: [RecipeController],
  providers: [
    PrismaService,
    {
      provide: RecipeRepository,
      useClass: PrismaRecipeRepository,
    },
    CreateRecipeUseCase,
    GetRecipesUseCase,
    GetRecipeByIdUseCase,
  ],
  exports: [RecipeRepository],
})
export class RecipesModule { }
