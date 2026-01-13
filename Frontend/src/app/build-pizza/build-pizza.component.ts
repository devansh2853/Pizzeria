import { Component } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { Ingredient } from '../models/ingredient.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css'],
})
export class BuildPizzaComponent {
  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  constructor(private ps: PizzaService, private cs: CartService) {}

  ngOnInit(): void {
    this.ps.getIngredients().subscribe((ingredientsData) => {
      this.ingredients = ingredientsData;
    });
  }

  get getCost(): number {
    var cost = 0;
    for (let ingredient of this.selectedIngredients) {
      cost += ingredient.price;
    }
    return cost;
  }

  isSelected(ingredient: Ingredient): boolean {
    return this.selectedIngredients.some((t) => t.id === ingredient.id);
  }
  toggleIngredient(ingredient: Ingredient): void {
    if (this.isSelected(ingredient)) {
      this.selectedIngredients = this.selectedIngredients.filter(
        (i) => i.id !== ingredient.id
      );
    } else {
      this.selectedIngredients = [...this.selectedIngredients, ingredient];
    }
  }

  buildPizza(): void {
    this.cs.addIngredients(this.selectedIngredients);
    this.selectedIngredients = [];
    alert('Custom Pizza added');
  }
}
