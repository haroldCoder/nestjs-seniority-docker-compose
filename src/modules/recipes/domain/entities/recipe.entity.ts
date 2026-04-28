export class Recipe {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string | null,
    public readonly authorId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) { }

  static create(data: {
    id?: number;
    title: string;
    description?: string;
    authorId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {

    return new Recipe(
      data.id || 0,
      data.title,
      data.description || null,
      data.authorId,
      data.createdAt || new Date(),
      data.updatedAt || new Date(),
    );
  }
}
