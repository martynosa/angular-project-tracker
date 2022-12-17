import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/types';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notification!: Notification;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService
      .getNotification()
      .subscribe((notification) => (this.notification = notification));
  }
}