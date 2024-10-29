import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginRequest} from "../../model/LoginRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string | null = null
  loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(6)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    },
  );

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const loginRequest = this.mapToLoginRequest(this.loginForm.value);
    this.authService.login(loginRequest).subscribe({
        next: response => {
          this.errorMessage = null;
          console.log("Login successful", response)
        },
        error: error => {
          this.errorMessage = error;
        }
      });
  }

  private mapToLoginRequest(formValue: any): LoginRequest {
    return {
      username: formValue.username,
      password: formValue.password.split('')
    };
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
