import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(form: Feedback): Observable <Feedback> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Feedback>(baseURL + 'feedback/', form, options)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
