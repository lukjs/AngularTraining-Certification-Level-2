import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-stock-tracking',
  templateUrl: './add-stock-tracking.component.html',
  styleUrls: ['./add-stock-tracking.component.scss'],
})
export class AddStockTrackingComponent {
  form!: FormGroup;
  @Output() newStock: EventEmitter<string>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      symbol: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });

    this.newStock = new EventEmitter<string>();
  }

  get symbol() {
    return this.form.get('symbol') as FormControl;
  }

  trackNewStock() {
    if (!this.symbol) return;

    this.newStock.emit(this.form.controls['symbol'].value);
    this.form.reset();
  }
}
