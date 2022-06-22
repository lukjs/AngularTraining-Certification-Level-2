import { Injectable } from '@angular/core';
import { Alert } from '@shared/models/alert';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AlertsService {
  private _alerts: BehaviorSubject<Alert[]>;
  alerts: Observable<Alert[]>;

  constructor() {
    this._alerts = new BehaviorSubject<Alert[]>([]);
    this.alerts = this._alerts.asObservable();
  }

  addAlert(alert: Alert) {
    this._alerts.next([...this._alerts.value, alert]);
    setTimeout(() => {
      this.removeAlert(alert);
    }, 3000);
  }

  removeAlert(alert: Alert) {
    this._alerts.next(
      [...this._alerts.value].filter((_alert) => _alert.id !== alert.id)
    );
  }
}
