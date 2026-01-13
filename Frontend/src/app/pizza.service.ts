import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from './models/pizza.model';
import { Ingredient } from './models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  url = 'http://localhost:5050';
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.url + '/pizzas');
  }

  getIngredients() {
    return this.http.get<Ingredient[]>(this.url + '/ingredients');
  }
}
