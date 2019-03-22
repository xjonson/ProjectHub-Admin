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
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    }
  }
}
