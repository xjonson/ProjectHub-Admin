import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { CookieService } from './cookie.service';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: User;

  constructor(
    private http: HttpClient,
    private cookieSrv: CookieService,
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user')
  }

  // 获取用户信息 默认是当前登录用户
  getUserInfo(id: string = (this.userInfo && this.userInfo.id)) {
    if (!id) id = this.cookieSrv.getCookie('ph-admin-user')
    return this.http.get(`/api/user/${id}`).pipe(
      tap(
        (user: User) => {
          if (!this.userInfo || id === this.userInfo.id) this.userInfo = user
        }
      )
    )
  }
  
  setUserInfo(user: User) {
    this.userInfo = user
  }

  // 更新信息
  updateUserInfo(id: string, data: Partial<User>) {
    return this.http.patch(`api/user/${id}`, data).pipe(
      tap(
        (user: User) => {
          if (!this.userInfo || id === this.userInfo.id) this.userInfo = user
        }
      )
    )
  }
}