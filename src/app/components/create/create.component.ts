import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  isLoading: boolean = false;

  createHandler(form: NgForm): void {
    if (!form.valid) {
      this.notificationService.setNotification({
        status: true,
        type: 'error',
        message: 'Please fill in the form!',
      });
      return;
    }

    this.isLoading = true;

    this.projectService
      .createProject(form.value.name, form.value.description)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notificationService.setNotification({
            status: true,
            type: 'success',
            message: 'Project created sucessfully.',
          });
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.setNotification({
            status: true,
            type: 'error',
            message: 'Internal error, please try again later!',
          });
        },
      });
  }
}
