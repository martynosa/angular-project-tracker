import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project-service';
import searchService from '../services/search-service';

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

  onKeyUp(event: any): void {
    this.filteredProjects = searchService(this.projects, event.target.value);
    this.newProjects = this.filteredProjects.filter((p) => p.status === 'new');
    this.inProgressProjects = this.filteredProjects.filter(
      (p) => p.status === 'inProgress'
    );
    this.completedProjects = this.filteredProjects.filter(
      (p) => p.status === 'completed'
    );
  }

  ngOnInit(): void {
    this.projectService
      .isLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.newProjects = this.projects.filter((p) => p.status === 'new');
      this.inProgressProjects = this.projects.filter(
        (p) => p.status === 'inProgress'
      );
      this.completedProjects = this.projects.filter(
        (p) => p.status === 'completed'
      );
    });
    this.projectService.fetchProjects();
  }
}
