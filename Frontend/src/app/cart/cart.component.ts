import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart_item.model';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart_items: CartItem[] = [];
  ingredientsList: Ingredient[][] = [];
  constructor(private cs: CartService) {}

  ngOnInit(): void {
    this.cs.getCartItems().subscribe((data) => {
      this.cart_items = data;
    });
    this.cs.getIngredients().subscribe((data) => {
      this.ingredientsList = data;
    });
  }

  get pizza_cost(): number {
    var cost = 0;
    for (let cart_item of this.cart_items) {
      cost += cart_item.price * cart_item.quantity;
    }

    return cost;
  }

  get ingredients_cost(): number {
    var cost = 0;
    for (let ingredients of this.ingredientsList) {
      for (let ingredient of ingredients) {
        cost += ingredient.price;
      }
    }
    return cost;
  }

  buildIngredients(ingredients: Ingredient[]): string {
    return ingredients.map((i) => i.tname).join(', ') ?? '';
  }

  deleteBuild(ingredients: Ingredient[]) {
    this.cs.deleteBuild(this.ingredientsList.indexOf(ingredients));
  }

  clearCart(): void {
    this.cs.clear();
  }

  checkout(): void {
    this.cs.checkout();
    alert("Your Order is on it's way");
  }
}
