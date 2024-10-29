import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class CoreModule {
}
