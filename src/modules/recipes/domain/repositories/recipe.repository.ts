import { Recipe } from '../entities/recipe.entity';

export abstract class RecipeRepository {
  abstract create(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe>;
  abstract findById(id: number): Promise<Recipe | null>;
  abstract findAll(): Promise<Recipe[]>;
  abstract findByAuthorId(authorId: number): Promise<Recipe[]>;
}
