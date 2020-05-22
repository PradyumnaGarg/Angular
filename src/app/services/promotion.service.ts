import { Injectable } from '@angular/core';
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS);
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]);
  }

  getFeaturedPromtion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
}
