import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class RecipeService {  

  private recipes: Recipe[] = [
    // new Recipe(
    //   'A Test Recipe', 
    //   'This is simply a test', 
    //   'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Potatoes', 5)
    //   ]),
    // new Recipe(
    //   'Another Test Recipe', 
    //   'This is simply a test', 
    //   'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg',
    //   [
    //     new Ingredient('Meat', 2),
    //     new Ingredient("Bread", 2)
    //   ])
  ];

  recipesChanged = new BehaviorSubject<Recipe[]>(this.recipes.slice());

  constructor(
      private shoppingListService: ShoppingListService, 
      private http: HttpClient,
      private authService: AuthService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipesChanged.next( this.recipes.splice(index, 1));
  }

  storeRecipes() {
    // implement pop up when finished loading
    this.http.put(`https://recipe-book-f8001.firebaseio.com/recipes.json`, this.recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`https://recipe-book-f8001.firebaseio.com/recipes.json`)
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients || []
        }
      })
    }))
    .pipe(tap(recipes => {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }))
  }
}