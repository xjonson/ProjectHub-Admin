import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { UserService } from './user.service';
import { tap, catchError, map } from 'rxjs/operators';
import { CookieService } from './cookie.service';
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
    public cookieSrv: CookieService,
    private router: Router,
    private modalService: NzModalService,
  ) {
    // 查看cookie中是否有登录信息
    this.userid = this.cookieSrv.getCookie('ph-admin-user')
    console.log('userid: ', this.userid);
    this.userSrv.getUserInfo(this.userid).subscribe(
      (user: User) => {
        console.log('login')
        this.login(user).subscribe()
      }
    )
  }

  // 登录
  login(loginForm: Partial<User>): Observable<User[]> {
    console.log('loginForm: ', loginForm);
    const params = new HttpParams().set("email", loginForm.email)
    return this.http.get<User[]>(`/api/user`, { params })
      .pipe(
        map((users: User[]) => {
          // 检测账户名
          if (users && users.length === 1) {
            const user = users[0]
            // 检测密码
            if (user.password === loginForm.password) {
              this.loginState = true
              this.userSrv.setUserInfo(user)
              return users
            }
          }
          this.modalService.error({
            nzTitle: '账户或密码错误',
          });
          throw new Error('账户或密码错误');
        }),
        catchError(this.handleError<User[]>('', []))
      )
  }

  // 登出
  logout() {
    this.loginState = false
    this.cookieSrv.delCookie('ph-admin-user')
    this.router.navigateByUrl('/login')
  }

  // 获取登录状态
  getAuthState(): boolean {
    return this.loginState
  }

  // catch Error
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
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
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 如果已登录，不守卫
    if (this.authSrv.getAuthState() || this.authSrv.userid) return true
    // 分割出params，不然会报错
    const redirectUrl: string = state.url.split('?')[0]
    // 保存进入前的路由

    this.modalService.error({
      nzTitle: '请先登录',
    });
    this.authSrv.redirectUrl = redirectUrl
    console.log('进入前的路由: ', redirectUrl);
    this.router.navigate(['/login'])
    return false

  }
}