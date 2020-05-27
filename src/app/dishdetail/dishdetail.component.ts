import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from "../shared/Dish";
import { DishService } from "../services/dish.service";
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({ 
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('*=>*', animate('0.5s ease-in-out'))
    ])
  ]
})


export class DishdetailComponent implements OnInit {
  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL') public baseURL
    ) { 
      this.createCommentsForm();
    }
    
  commentsForm: FormGroup;
  comment: Comment;
  dish: Dish;
  dishCopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishErrorMsg: string;
  visibility = 'shown';
  formErrors = {
    author: '',
    comment: ''
  }
  validationMessages = {
    author: {
      'required': 'Author name is requied',
      'minlength': 'Author name should be at least 2 characters long'
    },
    comment: {
      'required': 'Comment is required'
    }
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds, error => this.dishErrorMsg = <any>error);
    this.route.params
    .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id'])}))
    .subscribe(
      (dish) => { this.dish = dish; this.dishCopy = dish, this.setPrevNext(dish.id); this.visibility = 'shown' }
    );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createCommentsForm() {
    this.commentsForm = this.fb.group({
      comment: ['', Validators.required],
      author: ['', [Validators.minLength, Validators.required]],
      rating: 5,
      date: Date.now()
    })

    this.commentsForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?) {
    if(!this.commentsForm) return;
    const form = this.commentsForm;
    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
    .subscribe(dish => {
      this.dish = dish;
      this.dishCopy = dish
      },
      error => {
        this.dish = null;
        this.dishCopy = null;
        this.dishErrorMsg = error;
      })
    this.commentsForm.reset({
      comment: '',
      author: '',
      rating: 5,
      date: Date.now()
    });
  }

}
