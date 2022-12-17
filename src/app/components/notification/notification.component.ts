import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/types';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  notification!: Notification;

  ngOnInit(): void {
    this.notificationService
      .getNotification()
      .subscribe((notification) => (this.notification = notification));
  }
}
