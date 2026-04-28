import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '@recipes/domain/repositories';
import { Recipe } from '@recipes/domain/entities';

@Injectable()
export class GetRecipesUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) { }

  async execute(): Promise<Recipe[]> {
    return this.recipeRepository.findAll();
  }
}
