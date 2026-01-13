import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Pizza } from '../models/pizza.model';
import { Topping } from '../models/topping.model';
import { PizzaIngredient } from '../models/pizzaIngredient.model';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css'],
})
export class PizzaComponent {
  constructor(private cs: CartService) {}

  @Input() pizza!: Pizza;

  veg(): boolean {
    return this.pizza.type === 'veg';
  }
  get ingredientList(): string {
    return (
      this.pizza.ingredients?.map((i: PizzaIngredient) => i.iname).join(', ') ??
      ''
    );
  }
  get toppingList(): string {
    return this.pizza.topping?.map((i: Topping) => i.tname).join(', ') ?? '';
  }

  toggleCart(): void {
    if (this.isInCart()) {
      this.cs.removeFromCart(this.pizza.id);
    } else {
      this.cs.addToCart({ ...this.pizza, quantity: 1 });
    }
  }

  isInCart(): boolean {
    return this.cs.isInCart(this.pizza.id);
  }
}
