import {Component} from '@angular/core';
import {NumberReceiverService} from "../../services/number-receiver.service";
import {LotteryTicketRequest} from "../../model/LotteryTicketRequest";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent {

  ticketRequest: LotteryTicketRequest = new LotteryTicketRequest();
  numbersForm = new FormGroup({
      numberOne: new FormControl('', [Validators.min(1), Validators.max(50)]),
      numberTwo: new FormControl('', [Validators.min(1), Validators.max(50)]),
      numberThree: new FormControl('', [Validators.min(1), Validators.max(50)]),
      numberFour: new FormControl('', [Validators.min(1), Validators.max(50)]),
      numberFive: new FormControl('', [Validators.min(1), Validators.max(50)]),
      numberSix: new FormControl('', [Validators.min(1), Validators.max(50)])
    },
    [this.uniqueValuesValidator(), Validators.required]
  );

  constructor(private numbersService: NumberReceiverService, private router: Router) {
  }

  onSubmit() {
    this.ticketRequest.inputNumbers = Object.values(this.numbersForm.value) as unknown as number[];
    console.log(this.ticketRequest)
    this.numbersService.sendTicketNumbers(this.ticketRequest).subscribe({
      next: data => {
        console.log('Response:', data);
        this.router.navigate(['/ticket-details'], {state: {ticket: data}})
      },
      error: err => {
        console.log(err.error)
      }
    });
  }

  get numberOne() {
    return this.numbersForm.get('numberOne');
  }

  get numberTwo() {
    return this.numbersForm.get('numberTwo');
  }

  get numberThree() {
    return this.numbersForm.get('numberThree');
  }

  get numberFour() {
    return this.numbersForm.get('numberFour');
  }

  get numberFive() {
    return this.numbersForm.get('numberFive');
  }

  get numberSix() {
    return this.numbersForm.get('numberSix');
  }

  uniqueValuesValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const values = Object.values(group.value);
      const uniqueValues = new Set(values);
      return uniqueValues.size === values.length ? null : {nonUniqueValues: true};
    };
  }

}
