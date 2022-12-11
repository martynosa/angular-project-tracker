import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project-service';

import { Project } from '../types';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  myProjects: Project[] = [
    { title: 'first', description: 'My first project' },
    { title: 'second', description: 'My second project' },
    { title: 'third', description: 'My third project' },
    { title: 'fourth', description: 'My fourth project' },
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.myProjects = projects;
      console.log(this.myProjects);
    });
    this.projectService.fetchProjects();
  }
}
