import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { tap } from "rxjs/operators";
import { ResTpl } from '../models/ResTpl';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: User;

  constructor(
    private http: HttpClient,
    private nzMessage: NzMessageService,
  ) { }

  // 用户注册
  register(user: Partial<User>): Observable<any> {
    return this.http.post('/api/user/register', user)
  }

  // 用户登录
  login(user: Partial<User>): Observable<any> {
    return this.http.post('/api/user/login', user).pipe(
      tap(
        (res: ResTpl) => {
          if (res.code === 0) {
            this.setUserInfo(res.data)
          }
        }
      )
    )
  }

  setUserInfo(user: User) {
    this.userInfo = user
  }

  // 获取全部用户
  getUsers() {
    return this.http.get(`/api/user`).pipe(
      tap((resTpl: ResTpl) => {

      })
    )
  }

  // 获取用户信息
  getUserInfo(id?: string) {
    if (id) {
      return this.http.get(`/api/user/${id}`)
    } else {
      return this.http.get(`/api/user/self`).pipe(
        tap((resTpl: ResTpl) => {
          if (resTpl.code === 0) {
            this.userInfo = resTpl.data
          }
        })
      )
    }
  }

  // 更新信息
  updateUserInfo(data: Partial<User>) {
    return this.http.patch(`/api/user/${data._id}`, data).pipe(
      tap(
        (resTpl: ResTpl) => {
          this.nzMessage.create('info', resTpl.msg);
          if (resTpl.code === 0) this.userInfo = resTpl.data
        }
      )
    )
  }

  // 修改密码
  updatePassword(oldPwd, newPwd) {
    const data = {
      oldPwd,
      newPwd
    }
    return this.http.patch(`/api/user/password/${'updatePassword'}`, data).pipe(

    )
  }

  // 删除用户
  deleteUser(uid): Observable<any> {
    return this.http.delete(`/api/user/${uid}`).pipe(
      tap(
        (resTpl: ResTpl) => {
          this.nzMessage.create('info', resTpl.msg);
        }
      )
    )
  }
}