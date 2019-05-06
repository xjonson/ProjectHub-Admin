import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app/app.component';

/** 配置 angular i18n **/
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './router/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { SkillComponent } from './components/skill/skill.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './service/user.service';
import { SkillService } from './service/skill.service';
import { ProjectService } from './service/project.service';
import { ProjectStatusTextPipe, ProjectStatusPipe, ProjectColorPipe } from './pipe/project.pipe';

import 'zone.js';
import 'reflect-metadata';
import { ViserModule } from 'viser-ng';
import { MainComponent } from './common/main/main.component';
import { UploadService } from './service/upload.service';
import { AuthInterceptor } from './service/AuthInterceptor';
import { MsgService } from './service/msg.service';
import { DateService } from './service/date.service';
import { ProjectStepComponent } from './components/project-step/project-step.component';
import { RegAdminComponent } from './components/reg-admin/reg-admin.component';



registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ProjectComponent,
    SkillComponent,
    DashboardComponent,
    ProjectStatusTextPipe,
    ProjectStatusPipe,
    ProjectColorPipe, MainComponent, ProjectStepComponent, RegAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    BrowserAnimationsModule,
    ViserModule,
  ],

  bootstrap: [AppComponent],
  /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    UserService,
    ProjectService,
    SkillService,
    UploadService,
    MsgService,
    DateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // 路由hash模式
    { provide: LocationStrategy, useClass: HashLocationStrategy, }
  ]
})
export class AppModule { }