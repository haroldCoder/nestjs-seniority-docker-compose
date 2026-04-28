import { Injectable } from '@nestjs/common';
import { Recipe } from '@recipes/domain/entities';
import { RecipeRepository } from '@recipes/domain/repositories';

@Injectable()
export class CreateRecipeUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) { }

  async execute(data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    return this.recipeRepository.create(data);
  }
}
