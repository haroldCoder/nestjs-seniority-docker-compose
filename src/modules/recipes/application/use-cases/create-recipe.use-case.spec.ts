import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeUseCase } from './create-recipe.use-case';
import { RecipeRepository } from '@recipes/domain/repositories';
import { Recipe } from '@recipes/domain/entities';

describe('CreateRecipeUseCase', () => {
  let useCase: CreateRecipeUseCase;
  let repository: jest.Mocked<RecipeRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByAuthorId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRecipeUseCase,
        {
          provide: RecipeRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateRecipeUseCase>(CreateRecipeUseCase);
    repository = module.get(RecipeRepository);
  });

  it('should create a recipe successfully', async () => {
    const recipeData = {
      title: 'New Recipe',
      authorId: 1,
      description: 'description',
    };

    const recipeEntity = Recipe.create(recipeData);
    repository.create.mockResolvedValue(recipeEntity);

    const result = await useCase.execute(recipeData);

    expect(result).toBe(recipeEntity);
    expect(repository.create).toHaveBeenCalledWith(recipeData);
  });
});
