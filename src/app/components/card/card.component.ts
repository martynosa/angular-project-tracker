import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(private router: Router) {}

  @Input() project!: Project;
  @Input() changeStatus!: (
    event: Event,
    project: Project,
    type: string
  ) => void;

  navigateTo(): void {
    this.router.navigate(['projects', this.project._id]);
  }
}
