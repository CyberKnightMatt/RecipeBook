import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  
  ingredientsChanged = new Subject<Ingredient[]>();
  private  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];
  
  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    const index = this.ingredients.findIndex(i => i.name.toLowerCase() === ingredient.name.toLowerCase());
    const updateIngredient = this.ingredients.find(i => i.name.toLowerCase() === ingredient.name.toLowerCase());
    if (updateIngredient) {
      updateIngredient.amount =  +updateIngredient.amount + +ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => this.addIngredient(ingredient));
  }
}