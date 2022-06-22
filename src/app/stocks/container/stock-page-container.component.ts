import { Component, OnInit } from '@angular/core';
import { Stock } from '@shared/models';
import { StocksService } from '@stocks/stocks.service';

@Component({
  selector: 'app-stock-page-container',
  templateUrl: './stock-page-container.component.html',
  styleUrls: ['./stock-page-container.component.scss'],
})
export class StockPageContainerComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.stocks.subscribe((stocks) => {
      this.stocks = stocks;
    });
  }

  addStock(stockSymbol: string) {
    this.stocksService.addStock(stockSymbol);
  }

  removeStock(stock: Stock) {
    console.log('lclciked with', stock);
    this.stocksService.removeStock(stock);
  }
}
