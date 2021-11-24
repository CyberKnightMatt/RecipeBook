import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient) {
    const index = this.ingredients.findIndex(i => i.name.toLowerCase() === ingredient.name.toLowerCase());
    if (index !== -1) {
      this.ingredients[index].amount =  +this.ingredients[index].amount + +ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }

}
