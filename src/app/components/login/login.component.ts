import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/models/User';
import { CookieService } from 'src/app/service/cookie.service';
import { Router } from '_@angular_router@7.2.9@@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private nzMessage: NzMessageService,
    private cookieSrv: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    const formData = this.validateForm.value
    if (formData.email != 'admin@ph.com') {
      this.nzMessage.create('warn', `账号密码错误`);
      return
    }
    this.authSrv.login(formData).subscribe(
      (users: User[]) => {
        if (users) {
          const user = users[0]
          this.nzMessage.create('success', `登录成功，${user.profile.name}欢迎您!`);
          if(formData.remember) {
            this.cookieSrv.setCookie('ph-admin-user', user.id, 24 * 60 * 60)
          }
          // 重定向到授权前的路由
          this.router.navigate([this.authSrv.redirectUrl], {
            replaceUrl: true,
          })
        }
      }
    )
  }
}
