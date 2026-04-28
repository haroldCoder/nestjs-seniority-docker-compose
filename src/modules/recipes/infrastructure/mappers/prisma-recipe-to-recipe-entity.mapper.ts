import { Recipe } from "@recipes/domain/entities";
import { Recipe as RecipePrisma } from "@prisma/client";

export class PrismaRecipeToRecipeEntityMapper {
    static toDomain(recipe: RecipePrisma): Recipe {
        return Recipe.create({
            title: recipe.title,
            description: recipe.description!,
            authorId: recipe.authorId,
            createdAt: new Date(recipe.createdAt ?? new Date()),
            updatedAt: new Date(recipe.updatedAt ?? new Date()),
        });
    }
}