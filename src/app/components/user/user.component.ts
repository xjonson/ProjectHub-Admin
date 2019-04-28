import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { ResTpl } from 'src/app/models/ResTpl';
import { MsgService } from 'src/app/service/msg.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userTable: User[] = [];
  modal1 = false;
  userDetail: User;

  constructor(
    private userSrv: UserService,
    private msgSrv: MsgService,
  ) { }

  ngOnInit() {
    this.handleGetUsers()
  }

  handleGetUsers() {
    this.userSrv.getUsers().subscribe(
      (res: ResTpl) => {
        this.userTable = res.data.filter(item => item.role != 1)
      }
    )
  }
  // 审核用户
  auditUser(user: User, audit: 1 | 2) {
    const newUser = {
      ...user,
      audit
    }
    this.userSrv.updateUserInfo(newUser).subscribe(
      (res: ResTpl) => {
        if (res.code === 0) {
          this.handleGetUsers()
          this.sendCommentMsg(user, `您的账号审核 ${audit === 1 ? '通过' : '未通过'}`)
        }
      }
    )

  }
  // sendMsg
  sendCommentMsg(user, content: string): void {
    const data = {
      user_id: user._id,
      project_id: 0,
      content,
      project_comment_id: 0,
      action: 0,
      isAction: true,
    }
    this.msgSrv.sendMsg(data).subscribe()
  }
  showModal(data): void {
    this.modal1 = true;
    this.userDetail = data
  }
}
