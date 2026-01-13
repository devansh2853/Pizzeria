import { Ingredient } from './ingredient.model';

export interface CartIngredient {
  id: string;
  cost: number;
  Ingredients: Ingredient[];
}
