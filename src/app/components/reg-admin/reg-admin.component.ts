import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/User';
import { ResTpl } from 'src/app/models/ResTpl';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reg-admin',
  templateUrl: './reg-admin.component.html',
  styleUrls: ['./reg-admin.component.scss']
})
export class RegAdminComponent implements OnInit {
  userTable: User[] = [];
  modal1 = false;
  modal2 = false;
  userDetail: User;
  addAdminForm: FormGroup;

  constructor(
    private userSrv: UserService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this.handleGetUsers()
    this.initForm()
  }

  // 表单初始化
  initForm() {
    this.addAdminForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      password2: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
      ]],
      role: [1],
      create_time: [new Date()],
      profile: this.fb.group({
        name: ['', [
          Validators.required,
          Validators.maxLength(10)
        ]],
        phone: ['', [
          Validators.required,
          Validators.pattern(/^1(3|4|5|6|7|8|9)\d{9}$/)
        ]],
      })
    });
  }

  // 获取admin用户列表
  handleGetUsers() {
    this.userSrv.getUsers().subscribe(
      (res: ResTpl) => {
        this.userTable = res.data.filter(item => item.role === 1)
      }
    )
  }

  // 添加amdin
  addAdmin() {
    const formData = this.addAdminForm.value
    const newUser = {
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
      role: formData.role,
      profile: formData.profile,
    }
    this.userSrv.register(newUser).subscribe(res => {
      this.message.info(res.msg);
      if (res.code === 0) {
        this.modal2 = false
        this.handleGetUsers()
        this.initForm()
      }
    })

  }

  showModal(data): void {
    this.modal1 = true;
    this.userDetail = data
  }

  // 删除用户
  handleDeleteUser(user) {
    this.modal.warning({
      nzContent: '确认删除？请谨慎操作',
      nzOnOk: () => {
        this.userSrv.deleteUser(user._id).subscribe(
          (resTpl: ResTpl) => {
            if (resTpl.code === 0) {
              this.handleGetUsers()
            }
          }
        )
      }
    })
  }
}
