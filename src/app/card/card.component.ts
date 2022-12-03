import { Component, Input } from '@angular/core';

import { project } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() project!: project;

  constructor() {}
}
