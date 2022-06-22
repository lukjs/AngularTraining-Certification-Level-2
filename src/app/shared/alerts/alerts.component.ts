import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from '@shared/models/alert';
import { AlertsService } from '@shared/services';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent {
  AlertType = AlertType;
  alerts: Alert[] = [];

  constructor(private alertsService: AlertsService) {
    this.alertsService.alerts.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  deleteAlert(alert: Alert) {
    this.alertsService.removeAlert(alert);
  }
}
