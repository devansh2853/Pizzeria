import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Pizza } from '../models/pizza.model';
import { CartItem } from '../models/cart_item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() pizza!: CartItem;
  constructor(private cs: CartService) {}

  get veg(): boolean {
    return this.pizza.type === 'veg';
  }

  increaseQuantity(): void {
    this.cs.increaseQuantity(this.pizza.id);
  }

  decreaseQuantity(): void {
    this.cs.decreaseQuantity(this.pizza.id);
  }

  removeFromCart(): void {
    this.cs.removeFromCart(this.pizza.id);
  }
}
