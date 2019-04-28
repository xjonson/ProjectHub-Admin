import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '_@angular_router@7.2.9@@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  sidebarNav = [
    {
      icon: 'dashboard',
      title: '仪表盘',
      router: 'dashboard',
    },
    {
      icon: 'team',
      title: '用户管理',
      sub: [
        {
          icon: 'user',
          title: '用户列表',
          router: 'user',
        },
        {
          icon: 'usergroup-add',
          title: '管理员管理',
          router: 'reg-admin',
        },
      ]
    },
    {
      icon: 'project',
      title: '项目管理',
      sub: [
        {
          icon: 'project',
          title: '项目列表',
          router: 'project',
        },
      ]
    },
    {
      icon: 'setting',
      title: '设置',
      sub: [
        {
          icon: 'code',
          title: '技能 Skill',
          router: 'skill',
        },
        {
          icon: 'ordered-list',
          title: '项目评估元数据',
          router: 'project-step',
        },
      ]
    },
  ];
  breadcrumbs: string[];

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(
    private router: Router,
    private authSrv: AuthService,
    public userSrv: UserService,
  ) { }
  
  ngOnInit() {

  }

  ngAfterContentChecked(): void {
    let arr = this.router.url.split('/')
    arr.shift()
    this.breadcrumbs = arr
    // console.log('arr: ', arr);
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  logout(): void {
    this.authSrv.logout()
  }
}
