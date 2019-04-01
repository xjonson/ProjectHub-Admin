import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { UserService } from 'src/app/service/user.service';
import { ProjectService } from 'src/app/service/project.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    const date1 = new Date()
    const date2 = new Date(+date1 - (24 * 3600 * 1000))
    const today = this.formatDate(date1)
    const yesterday = this.formatDate(date2)

    // 合并 获取用户、项目数据
    const parallel$ = forkJoin(
      this.userSrv.getUsers(),
      this.projectSrv.getProjects()
    )
    parallel$.pipe(
      tap((res: ResTpl[]) => {
        const users = res[0].data
        const projects = res[1].data
        this.count.demandUser = users.filter(user => user.role === 2).length
        this.count.devUser = users.filter(user => user.role === 3).length
        this.count.userAll = users.length
        this.count.userToday = users.filter(u => this.formatDate(u.create_time) === today).length
        this.count.projectAll = projects.length
        this.count.projectToday = projects.filter(p => this.formatDate(p.create_time) === today).length
      })
    ).subscribe(
      () => {
        // 获取昨天的数据
        this.dashboardSrv.getDatas().subscribe(
          (data: Dashboard) => {

            const { user, page, project } = data
            const todayUser = user.find(item => item.date === today)
            const todayProject = project.find(item => item.date === today)
            const todayPage = page.find(item => item.date === today)
            // user
            if (!todayUser) {
              data.user = [
                ...data.user,
                {
                  date: today,
                  value: this.count.userAll
                }
              ]
            } else {
              todayUser.value = this.count.userAll
            }
            // project
            if (!todayProject) {
              data.project = [
                ...data.project,
                {
                  date: today,
                  value: this.count.projectAll
                }
              ]
            } else {
              todayProject.value = this.count.projectAll
            }
            // page
            if (todayPage) {
              this.count.pageToday = todayPage.value
            }
            this.count.pageAll = page.reduce((pre, cur) => {
              return pre + cur.value
            }, 0)

            // 更新统计图数据
            this.dashboardSrv.updateDatas(data).subscribe(
              (data: Dashboard) => {
                this.userData = data.user
                this.pageData = data.page
                this.projectData = data.project
              }
            )
          }
        )
      }
    )

  }
  formatDate(str: string | Date) {
    if (!(str instanceof Date)) {
      str = new Date(str)
    }
    return `${str.getFullYear()}-${str.getMonth() + 1}-${str.getDate()}`
  }

  // tabs
  tabChange(event) {
    this.tabAct = event.index
  }

}
