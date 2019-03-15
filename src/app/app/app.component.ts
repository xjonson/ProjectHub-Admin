import { Component, TemplateRef, ViewChild } from '@angular/core';

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
      title: 'User',
      sub: [
        {
          title: 'user',
          router: 'user',
        },
      ]
    },
    {
      icon: 'project',
      title: 'Project',
      sub: [
        {
          title: 'project',
          router: 'project',
        },
      ]
    },
    {
      icon: 'setting',
      title: 'Setting',
      sub: [
        {
          title: 'skill',
          router: 'skill',
        },
      ]
    },
  ]

  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
