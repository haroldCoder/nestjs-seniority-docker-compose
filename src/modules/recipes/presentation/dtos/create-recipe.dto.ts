import { IsNotEmpty, IsString, IsInt, IsOptional, MinLength } from 'class-validator';

export class CreateRecipeDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsInt({ message: 'AuthorId must be an integer' })
  @IsNotEmpty({ message: 'AuthorId is required' })
  authorId: number;
}
