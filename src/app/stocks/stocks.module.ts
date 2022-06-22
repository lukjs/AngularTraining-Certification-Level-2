import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpStocksService } from '@shared/services/http';
import { AddStockTrackingComponent } from './add-stock-tracking/add-stock-tracking.component';

import { StockPageContainerComponent } from './container/stock-page-container.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { StocksService } from './stocks.service';
import { StockDisplayerComponent } from './stock-displayer/stock-displayer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StocksRoutingModule,
  ],
  declarations: [
    StockPageContainerComponent,
    AddStockTrackingComponent,
    StockDisplayerComponent,
  ],
  exports: [StockPageContainerComponent, AddStockTrackingComponent],
  providers: [HttpStocksService, StocksService],
  bootstrap: [],
})
export class StocksModule {}
