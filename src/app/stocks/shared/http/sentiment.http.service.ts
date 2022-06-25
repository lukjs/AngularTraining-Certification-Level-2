import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockRaw } from '@stocks/shared/models/raw/stock.raw';
import { SymbolRaw } from '@stocks/shared/models/raw/symbol.raw';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sentiment } from '@stocks/shared/models';
import { DatePipe } from '@angular/common';
// import {} from '@stocks/models';
@Injectable()
export class HttpSentimentService {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {
    this.apiUrl = `${environment.api.url}${environment.api.prefix}${environment.api.version}`;
  }

  private formatDate(date: Date): string {
    return this.datepipe.transform(date, 'YYYY-MM-dd') || '';
  }

  getSentimentData(stockSymbol: string): Observable<Sentiment[]> {
    const dateFrom = new Date();
    const dateTo = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - 2);

    return this.httpClient
      .get<{ symbol: string; data: Sentiment[] }>(
        `${this.apiUrl}${environment.api.paths.sentiment}`,
        {
          params: {
            symbol: stockSymbol,
            from: this.formatDate(dateFrom),
            to: this.formatDate(dateTo),
          },
        }
      )
      .pipe(map((resp) => resp.data));
  }
}
