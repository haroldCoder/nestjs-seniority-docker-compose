import { Recipe } from './recipe.entity';

describe('Recipe Entity', () => {
  it('should create a recipe instance with valid data', () => {
    const data = {
      title: 'Pasta Carbonara',
      description: 'A classic Italian pasta dish',
      authorId: 1,
    };

    const recipe = Recipe.create(data);

    expect(recipe).toBeInstanceOf(Recipe);
    expect(recipe.title).toBe(data.title);
    expect(recipe.description).toBe(data.description);
    expect(recipe.authorId).toBe(data.authorId);
  });

  it('should set default values for id, createdAt and updatedAt', () => {
    const recipe = Recipe.create({
      title: 'Basic Recipe',
      authorId: 1,
    });

    expect(recipe.id).toBe(0);
    expect(recipe.createdAt).toBeInstanceOf(Date);
    expect(recipe.updatedAt).toBeInstanceOf(Date);
  });
});
