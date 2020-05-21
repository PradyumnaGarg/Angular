import { Component, OnInit, Input } from '@angular/core';
import { Dish } from "../shared/Dish";
import { DishService } from "../services/dish.service";
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  dish: Dish;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .then(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

}
