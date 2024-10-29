import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTicketComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
