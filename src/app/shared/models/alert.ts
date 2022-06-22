import { v4 as uuidv4 } from 'uuid';

export enum AlertType {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

export class Alert {
  id: string;

  constructor(public message: string, public type: AlertType) {
    this.id = uuidv4();
  }
}
