import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  fetchProjects() {
    return this.httpClient.get(`${environment.ITEMS_URL}`);
  }

  fetchProject(id: string) {
    return this.httpClient.get(`${environment.ITEMS_URL}/${id}`);
  }

  createProject(name: string, description: string) {
    return this.httpClient.post(`${environment.ITEMS_URL}`, {
      name,
      description,
    });
  }
}
