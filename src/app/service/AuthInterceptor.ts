import { Injectable } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  msgId;

  constructor(
    private router: Router,
    private nzMessage: NzMessageService,
  ) {

  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // loading
    this.msgId = this.nzMessage.loading('loading...', { nzDuration: 0 }).messageId;

    const token = localStorage.getItem('ph-admin-token') ? localStorage.getItem('ph-admin-token') : '';
    const clonedRequest = req.clone({
      headers: req.headers.set("Authorization", token)
    });

    return next.handle(clonedRequest).pipe(
      mergeMap((event: any) => {
        // end loading
        this.nzMessage.remove(this.msgId);
        this.msgId = null;

        // console.log('event: ', event);
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          // case 200:
          case 401: // 未登录状态码
            this.nzMessage.create('info', '身份信息过期，请重新登录');
            // alert('身份信息过期，请重新登录')
            this.router.navigate(['/login'])
          // case 404:
          // case 500:
          default:
            return of(event);
        }
      })
    )
  }

}