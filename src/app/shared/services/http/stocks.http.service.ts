import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockRaw } from '@shared/models/raw/stock.raw';
import { SymbolRaw } from '@shared/models/raw/symbol.raw';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpStocksService {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.api.url}${environment.api.prefix}${environment.api.version}`;
  }

  private httpGet<T>(path: string, params: any) {
    return this.httpClient.get<T>(`${this.apiUrl}${path}`, {
      params: {
        token: environment.api.token,
        ...params,
      },
    });
  }

  getSymbolData(stockSymbol: string): Observable<SymbolRaw[]> {
    return this.httpGet<{ count: number; result: SymbolRaw[] }>(
      environment.api.paths.symbol,
      {
        q: stockSymbol,
      }
    ).pipe(map((resp) => resp.result));
  }

  getStockData(stockSymbol: string): Observable<StockRaw> {
    return this.httpGet<StockRaw>(environment.api.paths.quote, {
      symbol: stockSymbol,
    });
  }
}
