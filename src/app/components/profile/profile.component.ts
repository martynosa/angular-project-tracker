import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { matchPasswordsValidator } from 'src/app/validators/match-password-validator';
import { Project, User } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  isUserLoading!: boolean;
  areProjectsLoading!: boolean;
  isPasswordChangeLoading!: boolean;
  currentUser!: User | null;
  projects!: Project[];

  form = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    newPasswords: this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        newRePassword: [''],
      },
      { validators: [matchPasswordsValidator('newPassword', 'newRePassword')] }
    ),
  });

  changePassword(): void {
    if (!this.form.valid) {
      this.notificationService.setNotification({
        status: true,
        type: 'error',
        message: 'Please fill in the form!',
      });
      return;
    }

    this.authService
      .isLoading()
      .subscribe((isLoading) => (this.isUserLoading = isLoading));

    this.authService.changePassword(
      this.form.value.password,
      this.form.value.newPasswords?.newPassword,
      this.form.value.newPasswords?.newRePassword
    );
  }

  ngOnInit(): void {
    this.authService
      .isLoading()
      .subscribe((isLoading) => (this.isUserLoading = isLoading));

    this.authService.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.areProjectsLoading = true;
    this.projectService.fetchProjects().subscribe((response: any) => {
      this.projects = response.data;
      this.areProjectsLoading = false;
    });
  }
}
