import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectTable: Project[] = [];
  mapOfExpandData: { [ key: string ]: boolean } = {};
 

  constructor(
    private projectSrv: ProjectService,
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
      }
    )
  }
}
