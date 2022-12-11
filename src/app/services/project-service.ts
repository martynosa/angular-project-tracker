import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Project } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private projects$ = new BehaviorSubject<Project[] | []>([]);
  private isLoading$ = new BehaviorSubject<boolean>(true);

  getProjects(): Observable<Project[] | []> {
    return this.projects$;
  }

  isLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  fetchProjects(): void {
    this.httpClient
      .get(`${environment.ITEMS_URL}`)
      .subscribe((response: any) => {
        this.projects$.next(response.data);
        this.isLoading$.next(false);
      });
  }
}
