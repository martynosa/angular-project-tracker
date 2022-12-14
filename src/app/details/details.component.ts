import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private projectService: ProjectService
  ) {}

  id!: string;
  isLoading: boolean = true;

  project!: Project;

  deleteHandler(): void {
    console.log('deleted');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.projectService.fetchProject(this.id).subscribe((response: any) => {
      this.project = response.data;
      this.isLoading = false;
    });
  }
}
