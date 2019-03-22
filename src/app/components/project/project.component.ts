import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectTable: Project[] = [];
  mapOfExpandData: { [key: string]: boolean } = {};


  constructor(
    private projectSrv: ProjectService,
    private userSrv: UserService,
    private nzMessage: NzMessageService
  ) { }

  ngOnInit() {
    this.handleGetProjects()
  }

  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (projects: Project[]) => {
        this.projectTable = projects
      }
    )
  }

  // 审核
  auditProject(project: Project, audit: 1 | 2): void {
    const newProject = {
      audit
    }
    
    this.projectSrv.updateProject(project.id, newProject).subscribe(
      () => {
        this.handleGetProjects()

        const demand_user_id = project.demand_user.id
        // 给需求者推送消息
        this.userSrv.getUserInfo(demand_user_id).subscribe(
          (demander: User) => {

            demander.msgs = [
              ...demander.msgs,
              {
                id: demander.msgs.length + '1',
                project_id: project.id,
                from_user: this.userSrv.userInfo,
                content: `您的【${project.title}】项目审核${audit == 1 ? '通过' : '不通过'}`,
                checked: false,
                create_time: new Date() + '',
                isAction: true,
                action: 0,
              }
            ]
            console.log('demander: ', demander);
            this.userSrv.updateUserInfo(demander.id, demander).subscribe(
              () => {
                this.nzMessage.create('success', `推送消息成功！`);
              }
            )
          }
        )
      }
    )
  }
}
