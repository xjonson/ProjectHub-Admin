import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  // 设置cookie
  setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

  //获取cookie
  getCookie(cname) {
    let arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  }

  // 删除cookie
  delCookie(name) {
    document.cookie = name + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}
