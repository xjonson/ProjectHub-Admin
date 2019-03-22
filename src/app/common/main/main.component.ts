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
      icon: 'user',
      title: '用户',
      sub: [
        {
          icon: 'user',
          title: '用户',
          router: 'user',
        },
      ]
    },
    {
      icon: 'project',
      title: '项目',
      sub: [
        {
          icon: 'project',
          title: '项目',
          router: 'project',
        },
      ]
    },
    {
      icon: 'setting',
      title: '设置',
      sub: [
        {
          icon: 'ordered-list',
          title: '技能 Skill',
          router: 'skill',
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
