import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User, LoginCredentials, RegisterCredentials, Project } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private projects!: Project[] | [];

  private projects$ = new BehaviorSubject<Project[] | []>([]);

  getProjects(): Observable<Project[] | []> {
    return this.projects$;
  }

  fetchProjects(): void {
    this.httpClient
      .get(`${environment.ITEMS_URL}`)
      .subscribe((response: any) => {
        this.projects = response.data;
        this.projects$.next(this.projects);
      });
  }
}
