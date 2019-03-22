import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
  ) { }

  getDatas() {
    return this.http.get('/api/dashboard')
  }

  updateDatas(data) {
    return this.http.patch('/api/dashboard', data)
  }
}
