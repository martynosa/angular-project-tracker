import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

import { Notification } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  private defaultNotification: Notification = {
    status: false,
    type: 'error',
    message: '',
  };

  private notification$$ = new BehaviorSubject<Notification>(
    this.defaultNotification
  );

  getNotification(): Observable<Notification> {
    return this.notification$$;
  }

  setNotification(notification: Notification): void {
    setTimeout(() => {
      this.notification$$.next(this.defaultNotification);
    }, 2000);
    this.notification$$.next(notification);
  }
}
