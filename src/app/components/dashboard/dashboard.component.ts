import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { UserService } from 'src/app/service/user.service';
import { ProjectService } from 'src/app/service/project.service';
import { forkJoin } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ResTpl } from 'src/app/models/ResTpl';



interface Dashboard {
  user: DashboardDate[],
  page: DashboardDate[],
  project: DashboardDate[],
}
interface DashboardDate {
  date: string,
  value: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart1 = {
    forceFit: true,
    height: 46,
    width: 200,
    padding: [0, 6],
    scale: [{
      dataKey: 'value',
    }, {
      dataKey: 'date',
    }],
    scaleWithText: [{
      dataKey: 'value',
    }, {
      dataKey: 'date',
    }]
  }
  userData = [];
  pageData = [];
  projectData = [];
  count = {
    pageAll: 0, // 页面访问量
    pageToday: 0, // 今日页面访问量
    userAll: 0, // 全部用户
    userToday: 0, // 今日增长
    devUser: 0, // 开发者用户量
    demandUser: 0, // 需求者用户量
    projectAll: 0, // 项目总数
    projectToday: 0,  // 今日项目
  }
  tabAct = 0;

  constructor(
    private dashboardSrv: DashboardService,
    private userSrv: UserService,
    private projectSrv: ProjectService,
  ) { }


  ngOnInit() {
    this.getPageData()
  }
  // 获取数据
  getPageData() {
    const now = new Date()
    const today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
    // 合并 获取用户、项目数据
    const parallel$ = forkJoin(
      this.userSrv.getUsers(),
      this.projectSrv.getProjects(),
      this.dashboardSrv.getDatas()
    )
    parallel$.subscribe(
      (res: ResTpl[]) => {
        const users = res[0].data
        const projects = res[1].data
        const pages = res[2].data
        const todayData = {
          pages: pages.filter(i => i.date === today),
          users: users.filter(i => this.formatDate(i.create_time) === today),
          projects: projects.filter(i => this.formatDate(i.create_time) === today)
        }
        const pastData = {
          pages: pages.reduce((pre, cur) => {
            return cur.count + pre.count
          }, 0),
          users: users.length,
          projects: projects.length
        }
        console.log('todayData: ', todayData);
        this.count.pageAll = pastData.pages
        this.count.pageToday = todayData.pages.length
        this.count.userAll = pastData.users
        this.count.userToday = todayData.users.length
        this.count.devUser = users.filter(i => i.role === 3).length
        this.count.demandUser = users.filter(i => i.role === 2).length
        this.count.projectAll = pastData.projects
        this.count.projectToday = todayData.projects.length
        // 生成chart
        this.pageData = pages.map(i => {
          i.value = i.count
          return i
        }).slice(pages.length - 15, pages.length)
        console.log('this.pageData: ', this.pageData);
        // this.userData = 
        // this.projectData = 
      }
    )

  }
  formatDate(str: string | Date) {
    if (!(str instanceof Date)) {
      str = new Date(str)
    }
    return `${str.getFullYear()}/${str.getMonth() + 1}/${str.getDate()}`
  }

  // tabs
  tabChange(event) {
    this.tabAct = event.index
  }

}
