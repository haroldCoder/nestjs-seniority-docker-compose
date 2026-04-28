export class RecipeNotFoundException extends Error {
  constructor(id: number) {
    super(`Recipe with id ${id} not found`);
    this.name = 'RecipeNotFoundException';
  }
}
