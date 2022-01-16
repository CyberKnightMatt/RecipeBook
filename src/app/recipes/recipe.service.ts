import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe', 
      'This is simply a test', 
      'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potatoes', 5)
      ]),
    new Recipe(
      'Another Test Recipe', 
      'This is simply a test', 
      'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient("Bread", 2)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}