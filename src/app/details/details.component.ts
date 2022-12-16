import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project-service';
import { Project } from '../types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  id!: string;
  isLoading!: boolean;

  project!: Project;

  deleteHandler(): void {
    this.isLoading = true;
    this.projectService.deleteProject(this.id).subscribe({
      next: (response: any) => {
        this.router.navigate(['/projects']);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.projectService.fetchProject(this.id).subscribe((response: any) => {
      this.project = response.data;
      this.isLoading = false;
    });
  }
}
