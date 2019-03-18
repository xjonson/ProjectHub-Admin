import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '_@angular_router@7.2.9@@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  ) {}
  
  ngAfterContentChecked(): void {
    let arr = this.router.url.split('/')
    arr.shift()
    this.breadcrumbs = arr
    // console.log('arr: ', arr);
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
