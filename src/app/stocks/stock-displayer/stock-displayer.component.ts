import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock } from '@shared/models';

@Component({
  selector: 'app-stock-displayer',
  templateUrl: './stock-displayer.component.html',
  styleUrls: ['./stock-displayer.component.scss'],
})
export class StockDisplayerComponent {
  @Input() stock!: Stock;
  @Output() stockRemoved = new EventEmitter<void>();

  removeStock() {
    this.stockRemoved.emit();
  }
}
