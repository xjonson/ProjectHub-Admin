import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';

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
      (users: User[]) => {
        this.userTable = users
      }
    )
  }

  showModal(data): void {
    this.modal1 = true;
    this.userDetail = data
  }
}
