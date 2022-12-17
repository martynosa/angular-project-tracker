import { Component, OnInit } from '@angular/core';

import { ProjectService } from 'src/app/services/project.service';
import { NotificationService } from 'src/app/services/notification.service';
import searchService from 'src/app/services/search.service';
import statusService from 'src/app/services/status.service';
import { Project } from 'src/app/types';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  isLoading!: boolean;
  projects!: Project[];
  filteredProjects!: Project[];

  newProjects!: Project[];
  inProgressProjects!: Project[];
  completedProjects!: Project[];

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService
  ) {}

  private filterProjects() {
    this.newProjects = this.projects.filter((p) => p.status === 'new');
    this.inProgressProjects = this.projects.filter(
      (p) => p.status === 'inProgress'
    );
    this.completedProjects = this.projects.filter(
      (p) => p.status === 'completed'
    );
  }

  private filterFilteredProjects() {
    this.newProjects = this.filteredProjects.filter((p) => p.status === 'new');
    this.inProgressProjects = this.filteredProjects.filter(
      (p) => p.status === 'inProgress'
    );
    this.completedProjects = this.filteredProjects.filter(
      (p) => p.status === 'completed'
    );
  }

  onKeyUp(event: any): void {
    this.filteredProjects = searchService(this.projects, event.target.value);
    this.filterFilteredProjects();
  }

  changeStatus = (e: Event, project: Project, type: string): void => {
    e.stopPropagation();
    this.isLoading = true;

    const newStatus = statusService(project.status, type);

    this.projectService.changeStatus(project, newStatus).subscribe({
      next: (response: any) => {
        const newProject = response.data;
        this.projects = this.projects.map((p) => {
          if (p._id === newProject._id) {
            p.status = newProject.status;
          }
          return p;
        });
        this.filterProjects();
        this.isLoading = false;
        this.notificationService.setNotification({
          status: true,
          type: 'success',
          message: 'Project status changed successfully.',
        });
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
  };

  ngOnInit(): void {
    this.isLoading = true;
    this.projectService.fetchProjects().subscribe((response: any) => {
      this.projects = response.data;
      this.filterProjects();
      this.isLoading = false;
    });
  }
}
