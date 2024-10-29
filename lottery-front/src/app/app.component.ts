import {Component} from '@angular/core';
import {LotteryResult} from "./model/LotteryResult";
import {ResultsService} from "./services/results.service";
import {interval, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'lottery-front';
  lotteryResult: LotteryResult = new LotteryResult();
  // ---
  private targetDate = new Date('2024-10-25T22:00:00');
  private subscription: Subscription;

  public countdown: {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  } = {days: 0, hours: 0, minutes: 0, seconds: 0};

  constructor(private resultsService: ResultsService, private router: Router) {
    // this.getLatestResults();
    this.lotteryResult.numbers = [1, 2, 3, 4, 5, 6];
    this.lotteryResult.drawDate = new Date('2024-11-02T20:00:00Z').toString();

    this.targetDate = new Date(this.lotteryResult.drawDate);
    this.subscription = interval(1000).subscribe(() => this.updateCountdown());
  }

  private updateCountdown(): void {
    const currentTime = new Date().getTime();
    const timeDiff = this.targetDate.getTime() - currentTime;

    this.countdown.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.countdown.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    this.countdown.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (timeDiff < 0) {
      this.refreshView();
    }
  }

  private refreshView(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  getLatestResults() {
    this.resultsService.getLatestResults().subscribe({
      next: data => {
        this.lotteryResult = data;
        this.formatDrawDate();
      },
      error: err => {
        console.log(err.error)
      }
    })
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
    let date = new Date(this.lotteryResult.drawDate);
    let formattedDate = date.toLocaleDateString('pl-PL', this.optionsDate);
    let formattedTime = date.toLocaleTimeString('pl-PL', this.optionsTime);
    this.lotteryResult.drawDate = `${formattedDate} ${formattedTime}`;
  }

}

