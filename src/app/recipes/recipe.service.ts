import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {  

  private recipes: Recipe[] = [
  ];

  recipesChanged = new BehaviorSubject<Recipe[]>(this.recipes.slice());

  constructor(
      private http: HttpClient,
      private authService: AuthService,
      private store: Store<fromApp.AppState>) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
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