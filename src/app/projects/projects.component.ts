import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project-service';

import { Project } from '../types';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  isLoading!: boolean;
  projects!: Project[];

  newProjects!: Project[];
  inProgressProjects!: Project[];
  completedProjects!: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService
      .isLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      console.log(this.projects);
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
