import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LotteryResult} from "../model/LotteryResult";


const LATEST_RESULTS_URL = 'results/latest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) {
  }

  getLatestResults(): Observable<LotteryResult> {
    return this.http.get<LotteryResult>(
      LATEST_RESULTS_URL,
      httpOptions
    );
  }
}
