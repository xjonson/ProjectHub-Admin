import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/service/skill.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  skillList = []
  skillName: string


  constructor(
    private skillSrv: SkillService,
    private nzMessage: NzMessageService,
  ) { }

  ngOnInit() {
    this.handleGetSkills()
  }

  // 获取全部skill
  handleGetSkills() {
    this.skillSrv.getSkills().subscribe(
      (resTpl: ResTpl) => {
        this.skillList = resTpl.data
      }
    )
  }

  // 添加skill
  addSkill() {
    if (!this.skillName) return
    const newSkill = {
      id: +this.skillList[this.skillList.length - 1].id + 1,
      name: this.skillName
    }
    this.skillSrv.addSkill(newSkill).subscribe(
      (resTpl: ResTpl) => {
        console.log('resTpl: ', resTpl);
        if (resTpl.code === 0) {
          this.skillName = ''
          this.nzMessage.create('info', `添加成功`);
          this.handleGetSkills()
        }
      }
    )
  }

  // 删除skill
  delSkill(skill) {
    console.log('skill: ', skill);
    this.skillSrv.delSkill(skill).subscribe(
      (resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          this.nzMessage.create('info', `删除成功`);
          this.handleGetSkills()
        }
      }
    )
  }
}
