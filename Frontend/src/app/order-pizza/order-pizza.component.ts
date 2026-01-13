import { Component } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { Pizza } from '../models/pizza.model';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.css'],
})
export class OrderPizzaComponent {
  pizzas: Pizza[] = [];
  constructor(private ps: PizzaService) {}
  ngOnInit(): void {
    this.ps.getPizzas().subscribe((pizzaData: Pizza[]) => {
      this.pizzas = pizzaData;
    });
  }
}
