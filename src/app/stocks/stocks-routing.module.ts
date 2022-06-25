import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSentimentDisplayerComponent } from './sentiment/stock-sentiment-displayer/stock-sentiment-displayer.component';
import { StockListComponent } from '@stocks/stock';

const routes: Routes = [
  {
    path: '',
    component: StockListComponent,
  },
  {
    path: 'sentiment/:symbol',
    component: StockSentimentDisplayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {}
