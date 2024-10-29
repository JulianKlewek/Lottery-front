import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent {
  accountActivated: boolean = false;
  token: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.token = this.route.snapshot.params['token'];
    this.activateAccount()
  }

  activateAccount() {
    let queryParam = this.token.substring(6);
    this.authService.confirmEmail(queryParam).subscribe({
      next: data => {
        this.accountActivated = true;
      },
      error: err => {
        console.log(err.error)
      }
    });
  }
}
