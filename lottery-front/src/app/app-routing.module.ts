import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {RegistrationComponent} from "./core/registration/registration.component";
import {EmailConfirmationComponent} from "./core/email-confirmation/email-confirmation.component";
import {NewTicketComponent} from "./components/new-ticket/new-ticket.component";
import {TicketDetailsComponent} from "./components/ticket-details/ticket-details.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'email-confirmation/:token', component: EmailConfirmationComponent},
  {path: 'new-ticket', component: NewTicketComponent},
  {path: 'ticket-details', component: TicketDetailsComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
