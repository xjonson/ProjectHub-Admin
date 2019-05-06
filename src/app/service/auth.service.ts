import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { UserService } from './user.service';
import { tap, catchError, map } from 'rxjs/operators';
// import { CookieService } from './cookie.service';
import { NzModalService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginState = false;
  public redirectUrl: string = 'main/dashboard';
  public userid: string;

  constructor(
    private http: HttpClient,
    private userSrv: UserService,
    private router: Router,
    private modal: NzModalService
  ) {
    // 查看cookie中是否有登录信息
    if (localStorage.getItem('ph-admin-token')) {
      this.userSrv.getUserInfo().subscribe(
        (user: User) => {
          this.loginState = true
          console.log('login')
          // this.userSrv.login(user).subscribe()
        }
      )
    }
  }


  logout() {
    this.modal.confirm({
      nzContent: '确定退出登录？',
      nzOnOk: () => {
        localStorage.removeItem('ph-admin-token')
        this.router.navigate(['/login'])
      }
    })
  }


  // 获取登录状态
  getAuthState(): boolean {
    return this.loginState
  }

}



// auth guard
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private modalService: NzModalService,
    private userSrv: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 如果已登录，不守卫
    if (localStorage.getItem('ph-admin-token') || this.authSrv.getAuthState() || this.userSrv.userInfo) return true
    // 分割出params，不然会报错
    const redirectUrl: string = state.url.split('?')[0]
    // 保存进入前的路由
    this.authSrv.redirectUrl = redirectUrl
    console.log('进入前的路由: ', redirectUrl);

    this.modalService.error({
      nzTitle: '请先登录',
    });
    this.router.navigate(['/login'])
    return false
  }
}