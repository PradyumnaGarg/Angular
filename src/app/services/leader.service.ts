import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from "../shared/Leaders";
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { baseURL } from '../shared/baseurl';
import { catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
    .pipe(map(leader => leader[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
