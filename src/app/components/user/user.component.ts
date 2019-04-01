import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { ResTpl } from 'src/app/models/ResTpl';

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
  ) { }

  ngOnInit() {
    this.handleGetUsers()
  }

  handleGetUsers() {
    this.userSrv.getUsers().subscribe(
      (res: ResTpl) => {
        console.log('res.data: ', res.data);
        this.userTable = res.data
      }
    )
  }

  showModal(data): void {
    this.modal1 = true;
    this.userDetail = data
  }
}
