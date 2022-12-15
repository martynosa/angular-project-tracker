import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectService } from '../services/project-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private projectService: ProjectService, private router: Router) {}

  isLoading: boolean = false;

  createHandler(form: NgForm): void {
    if (!form.valid) return;

    this.isLoading = true;

    this.projectService
      .createProject(form.value.name, form.value.description)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
  }

  ngOnInit(): void {}
}
