import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Stock } from '@stocks/shared/models';
import { StockService } from '@stocks/stock';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockListComponent {
  stocks: Observable<Stock[]>;

  constructor(private stocksService: StockService) {
    this.stocks = this.stocksService.stocks;
  }

  addStock(stockSymbol: string) {
    this.stocksService.addStock(stockSymbol);
  }

  removeStock(stock: Stock) {
    this.stocksService.removeStock(stock);
  }
}
