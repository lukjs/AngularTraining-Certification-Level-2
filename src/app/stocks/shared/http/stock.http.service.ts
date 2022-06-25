import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockRaw } from '@stocks/shared/models/raw/stock.raw';
import { SymbolRaw } from '@stocks/shared/models/raw/symbol.raw';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpStockService {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.api.url}${environment.api.prefix}${environment.api.version}`;
  }

  getSymbolData(stockSymbol: string): Observable<SymbolRaw[]> {
    return this.httpClient
      .get<{ count: number; result: SymbolRaw[] }>(
        `${this.apiUrl}${environment.api.paths.symbol}`,
        {
          params: { q: stockSymbol },
        }
      )
      .pipe(map((resp) => resp.result));
  }

  getStockData(stockSymbol: string): Observable<StockRaw> {
    return this.httpClient.get<StockRaw>(
      `${this.apiUrl}${environment.api.paths.quote}`,
      {
        params: { symbol: stockSymbol },
      }
    );
  }
}
