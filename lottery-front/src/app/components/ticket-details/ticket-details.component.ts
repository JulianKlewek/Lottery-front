import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LotteryTicketResponse} from "../../model/LotteryTicketResponse";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent{
  ticketResponse: LotteryTicketResponse = new LotteryTicketResponse();

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {ticket: LotteryTicketResponse};
    this.ticketResponse = state?.ticket;
    this.formatDrawDate()
  }

  optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  };

  optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };

  formatDrawDate() {
    let date = new Date(this.ticketResponse.ticket.drawDate);
    let formattedDate = date.toLocaleDateString('pl-PL', this.optionsDate);
    let formattedTime = date.toLocaleTimeString('pl-PL', this.optionsTime);
    this.ticketResponse.ticket.drawDate =  `${formattedDate} ${formattedTime}`;
  }

}
