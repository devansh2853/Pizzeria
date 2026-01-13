import { Injectable } from '@angular/core';
import { CartItem } from './models/cart_item.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient } from './models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private pizzasSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.pizzasSubject.asObservable();

  private ingredientsSubject = new BehaviorSubject<Ingredient[][]>([]);
  ingredients$ = this.ingredientsSubject.asObservable();

  private get pizzas(): CartItem[] {
    return this.pizzasSubject.value;
  }

  private get ingredients(): Ingredient[][] {
    return this.ingredientsSubject.value;
  }

  constructor() {}
  addToCart(pizza: CartItem): void {
    this.pizzasSubject.next([...this.pizzas, pizza]);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  isInCart(itemId: string): boolean {
    return this.pizzas.some((i) => i.id === itemId);
  }

  removeFromCart(itemId: string): void {
    this.pizzasSubject.next(this.pizzas.filter((i) => i.id !== itemId));
  }

  increaseQuantity(itemId: string): void {
    this.pizzasSubject.next(
      this.pizzas.map((pizza) => {
        if (pizza.id === itemId) {
          return {
            ...pizza,
            quantity: pizza.quantity + 1,
          };
        }
        return pizza;
      })
    );
  }

  decreaseQuantity(itemId: string): void {
    this.pizzasSubject.next(
      this.pizzas
        .map((pizza) => {
          if (pizza.id === itemId) {
            return {
              ...pizza,
              quantity: pizza.quantity - 1,
            };
          }
          return pizza;
        })
        .filter((pizza) => pizza.quantity > 0)
    );
  }

  getIngredients(): Observable<Ingredient[][]> {
    return this.ingredients$;
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredientsSubject.next([...this.ingredients, ingredients]);
  }

  deleteBuild(index: number): void {
    this.ingredientsSubject.next(
      this.ingredients.filter((build, i) => i !== index)
    );
  }

  checkout(): void {
    this.clear();
  }

  clear(): void {
    this.ingredientsSubject.next([]);
    this.pizzasSubject.next([]);
  }
}
