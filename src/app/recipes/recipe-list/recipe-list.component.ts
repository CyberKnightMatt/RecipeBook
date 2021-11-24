import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://p0.pxfuel.com/preview/422/435/800/crust-roast-meat-food-dinner.jpg')
  ]; 

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
