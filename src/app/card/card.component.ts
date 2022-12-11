import { Component, Input } from '@angular/core';

import { Project } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() project!: Project;

  changeStatus(type: string): void {
    console.log(type);
  }

  constructor() {}
}
