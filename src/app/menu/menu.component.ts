import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from "../services/dish.service";
import { flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  
   dishes: Dish[];
   errormsg: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      error => {
        this.errormsg = <any>error;
        console.log(this.errormsg);
      } );
    console.log(this.errormsg);
  }

}
