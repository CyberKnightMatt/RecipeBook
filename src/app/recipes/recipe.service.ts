import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg')
  ]; 

  getRecipes() {
    return this.recipes.slice();
  }
}