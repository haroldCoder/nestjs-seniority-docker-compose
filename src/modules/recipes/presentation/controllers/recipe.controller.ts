import { Controller, Post, Get, Body, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { CreateRecipeUseCase, GetRecipesUseCase, GetRecipeByIdUseCase } from '@recipes/application/use-cases';
import { CreateRecipeDto } from '../dtos';
import { ConvertCreateRecipeDtoToRecipeEntityMapper } from '../mappers';
import { RecipesExceptionFilter } from '../filters';

@Controller('recipes')
@UseFilters(RecipesExceptionFilter)
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly getRecipesUseCase: GetRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
  ) { }

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    const recipe = ConvertCreateRecipeDtoToRecipeEntityMapper.toDomain(createRecipeDto);
    return this.createRecipeUseCase.execute(recipe);
  }

  @Get()
  async findAll() {
    return this.getRecipesUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getRecipeByIdUseCase.execute(id);
  }
}
