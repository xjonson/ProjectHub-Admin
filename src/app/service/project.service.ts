import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { NzMessageService } from 'ng-zorro-antd';
import { tap } from 'rxjs/operators';
import { ResTpl } from '../models/ResTpl';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient,
    private nzMessage: NzMessageService,
  ) { }

  // 获取全部project
  getProjects(): Observable<any> {
    return this.http.get('api/project').pipe(
      tap((res: ResTpl) => {
        this.nzMessage.create('info', res.msg);
      })
    )
  }

  // 获取单个project详情
  getProject(id: string): Observable<any> {
    return this.http.get(`api/project/${id}`)
    // .pipe(
    //   tap((res: ResTpl) => {
    // this.nzMessage.create('info', res.msg);
    //   })
    // )
  }

  // 更新项目信息
  updateProject(pid: string, data: any) {
    return this.http.patch(`api/project/${pid}`, data).pipe(
      tap((res: ResTpl) => {
        this.nzMessage.create('info', res.msg);
      })
    )
  }

  // 删除项目
  delProject(pid: string): Observable<any> {
    return this.http.delete(`api/project/${pid}`).pipe(
      tap((res: ResTpl) => {
        this.nzMessage.create('info', res.msg);
      })
    )
  }
}
