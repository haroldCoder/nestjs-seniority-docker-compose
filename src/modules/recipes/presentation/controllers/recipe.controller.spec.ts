import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from '@recipes/presentation/controllers';
import { CreateRecipeUseCase } from '@recipes/application/use-cases';
import { GetRecipesUseCase } from '@recipes/application/use-cases';
import { CreateRecipeDto } from '@recipes/presentation/dtos';
import { Recipe } from '@recipes/domain/entities';

describe('RecipeController', () => {
  let controller: RecipeController;
  let createRecipeUseCase: jest.Mocked<CreateRecipeUseCase>;
  let getRecipesUseCase: jest.Mocked<GetRecipesUseCase>;

  beforeEach(async () => {
    const mockCreateRecipeUseCase = {
      execute: jest.fn(),
    };
    const mockGetRecipesUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: CreateRecipeUseCase,
          useValue: mockCreateRecipeUseCase,
        },
        {
          provide: GetRecipesUseCase,
          useValue: mockGetRecipesUseCase,
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    createRecipeUseCase = module.get(CreateRecipeUseCase);
    getRecipesUseCase = module.get(GetRecipesUseCase);
  });

  it('should call CreateRecipeUseCase and return the created recipe', async () => {
    const dto: CreateRecipeDto = {
      title: 'Pasta',
      authorId: 1,
    };

    const recipeEntity = Recipe.create(dto);
    createRecipeUseCase.execute.mockResolvedValue(recipeEntity);

    const result = await controller.create(dto);

    expect(result).toBe(recipeEntity);
    expect(createRecipeUseCase.execute).toHaveBeenCalled();
  });

  it('should call GetRecipesUseCase and return the recipe list', async () => {
    const recipes = [
      Recipe.create({ title: 'Recipe 1', authorId: 1 }),
    ];

    getRecipesUseCase.execute.mockResolvedValue(recipes);

    const result = await controller.findAll();

    expect(result).toBe(recipes);
    expect(getRecipesUseCase.execute).toHaveBeenCalled();
  });
});
