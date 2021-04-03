import {
  ValidationResult,
  createDefaultValidationResult,
} from "@lemoncode/fonk";

export interface Recipe {
  id: number;
  name: string;
  image?: string;
  description: string;
  ingredients: string[];
}

export const createEmptyRecipe = (): Recipe => ({
  id: 0,
  name: "",
  description: "",
  image: "",
  ingredients: [],
});

export interface RecipeError {
  name: ValidationResult;
  ingredients: ValidationResult;
  description: ValidationResult;
  image: ValidationResult;
}

export const createEmptyRecipeError = (): RecipeError => ({
  name: createDefaultValidationResult(),
  ingredients: createDefaultValidationResult(),
  image: createDefaultValidationResult(),
  description: createDefaultValidationResult(),
});
