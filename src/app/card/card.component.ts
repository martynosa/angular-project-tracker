import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() project!: Project;

  constructor(private router: Router) {}

  changeStatus(type: string): void {
    console.log(type);
  }

  navigateTo(): void {
    this.router.navigate(['projects', this.project._id]);
  }
}
