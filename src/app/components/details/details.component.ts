import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from 'src/app/services/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Project } from 'src/app/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id!: string;
  isLoading!: boolean;
  project!: Project;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  deleteHandler(): void {
    this.isLoading = true;
    this.projectService.deleteProject(this.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.setNotification({
          status: true,
          type: 'success',
          message: 'Project deleted successfully.',
        });
        this.router.navigate(['/projects']);
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

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.projectService.fetchProject(this.id).subscribe((response: any) => {
      this.project = response.data;
      this.isLoading = false;
    });
  }
}
