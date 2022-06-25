import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '@stocks/shared/models';
import { Sentiments } from '@stocks/shared/models';
import { StockService } from '@stocks/stock/stock.service';
import { Observable } from 'rxjs';
import { SentimentService } from '../sentiment.service';

@Component({
  selector: 'app-stock-sentiment-displayer',
  templateUrl: './stock-sentiment-displayer.component.html',
  styleUrls: ['./stock-sentiment-displayer.component.scss'],
})
export class StockSentimentDisplayerComponent implements OnDestroy {
  stock$: Observable<Stock | null>;
  sentiments$: Observable<Sentiments>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private sentimentService: SentimentService
  ) {
    const symbol = this.activatedRoute.snapshot.params['symbol'];

    this.stock$ = this.stockService.getStock(symbol);
    this.sentiments$ = this.sentimentService.sentiments;

    this.sentimentService.getSentiments(symbol);
  }

  ngOnDestroy(): void {
    this.sentimentService.clearSentiments();
  }
}
