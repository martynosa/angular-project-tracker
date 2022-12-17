import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import searchService from '../services/search.service';
import statusService from '../services/status.service';

import { Project } from '../types';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  isLoading!: boolean;
  projects!: Project[];
  filteredProjects!: Project[];

  newProjects!: Project[];
  inProgressProjects!: Project[];
  completedProjects!: Project[];

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
      },

      error: (err) => {
        console.log(err);
        this.isLoading = false;
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
