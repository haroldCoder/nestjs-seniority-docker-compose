import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '@recipes/domain/repositories';
import { Recipe } from '@recipes/domain/entities';
import { RecipeNotFoundException } from '../exceptions';

@Injectable()
export class GetRecipeByIdUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      throw new RecipeNotFoundException(id);
    }
    return recipe;
  }
}
