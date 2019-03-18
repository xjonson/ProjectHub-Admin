import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from '../components/login/login.component';
import { ProjectComponent } from '../components/project/project.component';
import { SkillComponent } from '../components/skill/skill.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'skill', component: SkillComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: '**', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
