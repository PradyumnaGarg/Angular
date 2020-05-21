import { Injectable } from '@angular/core';
import { Dish } from "../shared/Dish";
import { DISHES } from "../shared/Dishes";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      //Simulating server latency with 2 seconds delay
      setTimeout(() => resolve(DISHES), 2000)
    });
  }

  getDish(id: string): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
