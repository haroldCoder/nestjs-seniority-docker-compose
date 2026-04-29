import { Controller, Post, Get, Body, Param, ParseIntPipe, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRecipeDto } from '@recipes/presentation/dtos';

@Controller('api/recipes')
export class GatewayRecipesController {
  constructor(
    @Inject('RECIPES_SERVICE') private readonly recipesClient: ClientProxy,
  ) { }

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesClient.send({ cmd: 'create_recipe' }, createRecipeDto);
  }

  @Get()
  async findAll() {
    return this.recipesClient.send({ cmd: 'get_recipes' }, {});
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recipesClient.send({ cmd: 'get_recipe_by_id' }, id);
  }
}
