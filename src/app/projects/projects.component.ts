import { Component } from '@angular/core';

import { project } from '../types';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  myProjects: project[] = [
    { title: 'first', description: 'My first project' },
    { title: 'second', description: 'My second project' },
    { title: 'third', description: 'My third project' },
    { title: 'fourth', description: 'My fourth project' },
  ];

  constructor() {}
}
