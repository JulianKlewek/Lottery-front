import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LotteryTicketRequest} from "../model/LotteryTicketRequest";

const INPUT_NUMBERS_URL = 'lottery/input-numbers'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class NumberReceiverService {

  constructor(private http: HttpClient) { }

  sendTicketNumbers(request: LotteryTicketRequest): Observable<any> {
    return this.http.post(
      INPUT_NUMBERS_URL,
      request,
      httpOptions
    );
  }
}
