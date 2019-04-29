import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectStepService {

  constructor(
    private http: HttpClient
  ) { }

  getProjectStep(): Observable<any> {
    return this.http.get('/api/projectStep')
  }
  updateProjectStep(_id, newProjectStep): Observable<any> {
    return this.http.patch(`/api/projectStep/${_id}`, newProjectStep)
  }
}
