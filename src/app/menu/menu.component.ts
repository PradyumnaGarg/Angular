import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from "../shared/Dishes";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
   dishes: Dish[] = DISHES;

   selectedDish: Dish;

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
