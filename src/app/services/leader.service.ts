import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from "../shared/Leaders";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe();
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe();
  }
}
