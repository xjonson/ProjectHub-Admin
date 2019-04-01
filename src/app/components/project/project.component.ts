import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/models/User';
import { ResTpl } from 'src/app/models/ResTpl';
import { MsgService } from 'src/app/service/msg.service';

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
    private nzMessage: NzMessageService,
    private msgSrv: MsgService,
  ) { }

  ngOnInit() {
    this.handleGetProjects()
  }

  handleGetProjects() {
    this.projectSrv.getProjects().subscribe(
      (res: ResTpl) => {
        this.projectTable = res.data
      }
    )
  }

  // 审核
  auditProject(project: Project, audit: 1 | 2): void {
    const newProj = {
      ...project,
      audit
    }
    this.projectSrv.updateProject(project._id, newProj).subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.handleGetProjects()
          this.sendCommentMsg(project, `您的项目「${project.title}」审核 ${audit === 1 ? '通过' : '未通过'}`)
        }
      }
    )
  }

  // sendMsg
  sendCommentMsg(project, content: string): void {
    const data = {
      user_id: project.demand_user._id,
      project_id: project._id,
      content,
      project_comment_id: 0,
      action: 0,
      isAction: true,
    }
    this.msgSrv.sendMsg(data).subscribe()
  }
}
