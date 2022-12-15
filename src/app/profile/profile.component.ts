import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { AuthService } from '../services/auth-service';
import { ProjectService } from '../services/project-service';
import { Project, User } from '../types';
import { matchPasswordsValidator } from '../validators/match-password-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  isUserLoading!: boolean;
  areProjectsLoading: boolean = true;
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
    if (!this.form.valid) return;

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

    this.projectService.fetchProjects().subscribe((response: any) => {
      this.projects = response.data;
      this.areProjectsLoading = false;
    });
  }
}
