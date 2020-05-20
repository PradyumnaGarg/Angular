import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from "../shared/Leaders";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  Leaders: Leader[];
  featuredLeader: Leader;

  constructor() { }

  getLeaders(): Leader[] {
    return this.Leaders = LEADERS;
  }

  getFeaturedLeader(): Leader {
    return this.featuredLeader = LEADERS.filter((leader) => leader.featured)[0];
  }
}
