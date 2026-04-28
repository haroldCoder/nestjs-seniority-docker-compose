import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../../domain/entities/recipe.entity';

export class ConvertCreateRecipeDtoToRecipeEntityMapper {
  static toDomain(dto: CreateRecipeDto): Recipe {
    return Recipe.create(dto);
  }
}
