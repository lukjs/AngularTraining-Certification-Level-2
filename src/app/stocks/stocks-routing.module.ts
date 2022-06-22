import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockPageContainerComponent } from './container/stock-page-container.component';

const routes: Routes = [
  //   { path: '', redirectTo: '/stocks', pathMatch: 'full' },
  {
    path: '',
    component: StockPageContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {}
