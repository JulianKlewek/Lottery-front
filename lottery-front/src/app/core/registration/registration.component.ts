import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationRequest} from "../../model/RegistrationRequest";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  successful = false;
  objectKeys = Object.keys;
  errorMsg:{ [key: string]: string } = {};
  registrationForm = new FormGroup({
      email: new FormControl("", [
        Validators.required, Validators.email
      ]),
      username: new FormControl("", [
        Validators.required, Validators.minLength(6), Validators.maxLength(20)
      ]),
      password: new FormControl("", [
        Validators.required, Validators.minLength(8), Validators.maxLength(30)
      ]),
    },
  );

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    const registrationRequest = this.mapToRegistrationRequest(this.registrationForm.value);
    this.authService.register(registrationRequest).subscribe({
      next: response => {
        this.successful = true;
        this.router.navigate(['/login']);
      },
      error: error => {
        this.errorMsg = error;
        this.successful = false;
      }
    });
  }

  private mapToRegistrationRequest(formValue: any): RegistrationRequest {
    return {
      email: formValue.email,
      username: formValue.username,
      password: formValue.password.split('')
    };
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

}
