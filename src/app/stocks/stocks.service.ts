import { Injectable } from '@angular/core';
import { Stock } from '@shared/models';
import { Alert, AlertType } from '@shared/models/alert';
import { StockRaw } from '@shared/models/raw/stock.raw';
import { SymbolRaw } from '@shared/models/raw/symbol.raw';
import { AlertsService } from '@shared/services';
import { HttpStocksService } from '@shared/services/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class StocksService {
  private static readonly STOCKS_TRACKED_KEY = 'stocks_tracked';

  private _stocks: BehaviorSubject<Stock[]>;
  stocks: Observable<Stock[]>;

  constructor(
    private httpStock: HttpStocksService,
    private alertsService: AlertsService
  ) {
    this._stocks = new BehaviorSubject<Stock[]>([]);
    this.stocks = this._stocks.asObservable();

    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(
      StocksService.STOCKS_TRACKED_KEY,
      JSON.stringify(this._stocks.value.map((stock) => stock.symbol))
    );
  }

  private loadFromStorage() {
    const saved = localStorage.getItem(StocksService.STOCKS_TRACKED_KEY) || '';
    try {
      (JSON.parse(saved) as string[]).forEach((symbol) =>
        this.addStock(symbol)
      );
    } catch (err) {
      this.alertsService.addAlert(
        new Alert(`Failed to load symbol from storage`, AlertType.ERROR)
      );
    }
  }

  removeStock(stock: Stock) {
    this._stocks.next(
      [...this._stocks.value].filter((_stock) => _stock.symbol !== stock.symbol)
    );
    this.alertsService.addAlert(
      new Alert(`Stock ${stock.name} removed`, AlertType.WARNING)
    );
    this.saveToStorage();
  }

  addStock(stockSymbol: string): void {
    if (this._stocks.value.find((stock) => stock.symbol === stockSymbol)) {
      this.alertsService.addAlert(
        new Alert(`Stock ${stockSymbol} already added`, AlertType.WARNING)
      );
      return;
    }

    this.alertsService.addAlert(
      new Alert(`Searching for stock symbol ${stockSymbol}`, AlertType.WARNING)
    );

    const symbolData = this.httpStock
      .getSymbolData(stockSymbol)
      .pipe<SymbolRaw>(
        map((symbols) => symbols.filter((s) => s.symbol === stockSymbol)[0])
      );
    const stockData = this.httpStock.getStockData(stockSymbol);

    forkJoin({ symbolData, stockData })
      .pipe<Stock>(
        map(({ symbolData, stockData }) => ({
          ...StockRaw.toStock(stockData),
          name: symbolData.description,
          symbol: stockSymbol,
        }))
      )
      .subscribe({
        next: (stock) => {
          this._stocks.next([...this._stocks.value, stock]);
          this.alertsService.addAlert(
            new Alert(`Stock ${stock.name} added`, AlertType.SUCCESS)
          );
          this.saveToStorage();
        },
        error: (err) => {
          this.alertsService.addAlert(
            new Alert(
              `Stock symbol ${stockSymbol} is invalid or unknown`,
              AlertType.ERROR
            )
          );
        },
      });
  }
}
