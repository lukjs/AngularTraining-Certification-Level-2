import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Stock } from '@stocks/shared/models';

@Component({
  selector: 'app-stock-displayer',
  templateUrl: './stock-displayer.component.html',
  styleUrls: ['./stock-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDisplayerComponent {
  @Input() stock!: Stock;
  @Output() stockRemoved = new EventEmitter<void>();

  removeStock() {
    this.stockRemoved.emit();
  }
}
