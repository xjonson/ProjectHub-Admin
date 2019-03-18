import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
  ) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/project')
  }
}
