import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from "../shared/Dish";
import { Promotion } from "../shared/promotion";
import { Leader } from '../shared/Leader';

import { DishService } from "../services/dish.service";
import { PromotionService } from "../services/promotion.service";
import { LeaderService } from "../services/leader.service";
import { flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  dishErrorMsg: string;
  leaderErrorMsg: string;
  promotionErrorMsg: string;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService,
    @Inject("BaseURL") public baseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish, errorMsg => this.dishErrorMsg = <any>errorMsg);
    this.promotionService.getFeaturedPromtion()
    .subscribe(promotion => this.promotion = promotion, errorMsg => this.promotionErrorMsg = <any>errorMsg);
    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader , errorMsg => this.leaderErrorMsg = <any>errorMsg);
  }

}
