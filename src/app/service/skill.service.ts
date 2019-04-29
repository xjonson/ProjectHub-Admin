import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private http: HttpClient
  ) { }

  getSkills() {
    return this.http.get('api/skill')
  }

  addSkill(data): Observable<any> {
    return this.http.post('api/skill', data)
  }

  delSkill(data): Observable<any> {
    return this.http.delete('api/skill/' + data._id)
  }
}
