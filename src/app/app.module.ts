import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { StocksModule } from './stocks/stocks.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { AlertsService } from '@shared/services/alerts.sevice';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AlertsComponent],
  imports: [
    FormsModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    StocksModule,
  ],
  providers: [AlertsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
