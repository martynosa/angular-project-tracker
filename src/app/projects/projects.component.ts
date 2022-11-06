import { Component, OnInit } from '@angular/core';

import { project } from 'src/Interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  myProjects: project[] = [
    { title: 'first', description: 'My first project' },
    { title: 'second', description: 'My second project' },
    { title: 'third', description: 'My third project' },
    { title: 'fourth', description: 'My fourth project' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
