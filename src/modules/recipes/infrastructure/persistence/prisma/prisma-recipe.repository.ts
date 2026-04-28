import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/infrastructure/db/prisma/client';
import { Recipe } from '@recipes/domain/entities';
import { RecipeRepository } from '@recipes/domain/repositories';
import { PrismaRecipeToRecipeEntityMapper } from '@recipes/infrastructure/mappers';

@Injectable()
export class PrismaRecipeRepository implements RecipeRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    const created = await this.prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: data.authorId
      },
    });

    return PrismaRecipeToRecipeEntityMapper.toDomain(created);
  }

  async findById(id: number): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      return null;
    }

    return PrismaRecipeToRecipeEntityMapper.toDomain(recipe);
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.prisma.recipe.findMany();
    return recipes.map((recipe) => PrismaRecipeToRecipeEntityMapper.toDomain(recipe));
  }

  async findByAuthorId(authorId: number): Promise<Recipe[]> {
    const recipes = await this.prisma.recipe.findMany({
      where: { authorId },
    });

    return recipes.map((recipe) => PrismaRecipeToRecipeEntityMapper.toDomain(recipe));
  }
}
