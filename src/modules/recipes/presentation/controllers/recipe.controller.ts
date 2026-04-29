import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRecipeUseCase, GetRecipesUseCase, GetRecipeByIdUseCase } from '@recipes/application/use-cases';
import { CreateRecipeDto } from '../dtos';
import { ConvertCreateRecipeDtoToRecipeEntityMapper } from '../mappers';
import { RecipesExceptionFilter } from '../filters';

@Controller()
@UseFilters(RecipesExceptionFilter)
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly getRecipesUseCase: GetRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
  ) { }

  @MessagePattern({ cmd: 'create_recipe' })
  async create(@Payload() createRecipeDto: CreateRecipeDto) {
    const recipe = ConvertCreateRecipeDtoToRecipeEntityMapper.toDomain(createRecipeDto);
    return this.createRecipeUseCase.execute(recipe);
  }

  @MessagePattern({ cmd: 'get_recipes' })
  async findAll() {
    return this.getRecipesUseCase.execute();
  }

  @MessagePattern({ cmd: 'get_recipe_by_id' })
  async findOne(@Payload() id: number) {
    return this.getRecipeByIdUseCase.execute(id);
  }
}
