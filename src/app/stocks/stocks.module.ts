import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocksRoutingModule } from './stocks-routing.module';
import {
  StockService,
  StockListComponent,
  StockAddFormComponent,
  StockDisplayerComponent,
} from '@stocks/stock';
import {
  SentimentService,
  StockSentimentDisplayerComponent,
} from '@stocks/sentiment';
import { HttpSentimentService, HttpStockService } from '@stocks/shared/http';
import { FinnhubTokenInterceptor } from '@stocks/shared/interceptors';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StocksRoutingModule,
  ],
  declarations: [
    StockListComponent,
    StockAddFormComponent,
    StockDisplayerComponent,
    StockSentimentDisplayerComponent,
  ],
  providers: [
    DatePipe,
    HttpStockService,
    HttpSentimentService,
    StockService,
    SentimentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FinnhubTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [],
})
export class StocksModule {}
