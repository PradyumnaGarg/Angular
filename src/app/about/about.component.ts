import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from "../shared/Leader";
import { LeaderService } from "../services/leader.service";
import { flyInOut } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leaderErrorMsg: string;
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders, errorMsg => this.leaderErrorMsg = errorMsg);
  }

}
