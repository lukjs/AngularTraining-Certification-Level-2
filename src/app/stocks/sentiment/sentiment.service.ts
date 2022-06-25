import { Injectable } from '@angular/core';
import { Sentiments } from '@stocks/shared/models';
import { AlertsService } from '@shared/services';
import { HttpSentimentService } from '@stocks/shared/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable()
export class SentimentService {
  private _sentiments: BehaviorSubject<Sentiments>;
  sentiments: Observable<Sentiments>;

  constructor(private httpSentiment: HttpSentimentService) {
    this._sentiments = new BehaviorSubject<Sentiments>([]);
    this.sentiments = this._sentiments.asObservable();
  }

  clearSentiments() {
    this._sentiments.next([]);
  }

  getSentiments(stockSymbol: string) {
    this.httpSentiment
      .getSentimentData(stockSymbol)
      .pipe(
        map((sentiment) =>
          sentiment.map((s) => ({ ...s, date: new Date(s.year, s.month) }))
        )
      )
      .subscribe((sentiments) => this._sentiments.next(sentiments));
  }
}
