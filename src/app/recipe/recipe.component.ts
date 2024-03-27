import { Component, OnInit } from '@angular/core';

export interface Recipe {
  title: string,
  ingredients: string[],
  text: string,
  vegetarian: boolean
} 

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass']
})

export class RecipeComponent implements OnInit {

  load = false
  buttonText = 'LOAD RECIPES'
  text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.'
  recipes: Recipe[] = [
    {title: 'Borscht', ingredients: ['Beet', 'Meat', 'Cabbage'], text: this.text, vegetarian: false},
    {title: 'Varenyky', ingredients: ['Flour', 'Meat', 'Cabbage'], text: this.text, vegetarian: false},
    {title: 'Piureshka', ingredients: ['Potatoes', 'Butter'], text: this.text, vegetarian: true},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeButton() {
    this.load = !this.load
    this.buttonText === 'LOAD RECIPES' ? this.buttonText = 'CLOSE RECIPES' : this.buttonText = 'LOAD RECIPES'
  }

}
