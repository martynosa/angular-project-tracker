import { Component, Input, OnInit } from '@angular/core';

import { project } from 'src/Interfaces/project';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() project!: project;

  constructor() {}

  ngOnInit(): void {
    console.log(this.project);
  }
}
