import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { AnswersPageComponent } from './pages/answers-page/answers-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { AllUsersPageComponent } from './components/users/all-users-page/all-users-page.component';
import { OneUsersPageComponent } from './components/users/one-users-page/one-users-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { AllReportsComponent } from './components/reports/all-reports/all-reports.component';
import { OneReportWithDetailComponent } from './components/reports/one-report-with-detail/one-report-with-detail.component';
import { ApprovedReportComponent } from './components/reports/approved-report/approved-report.component';
import { AllQuestionComponent } from './components/question/all-question/all-question.component';
import { OneQuestionComponent } from './components/question/one-question/one-question.component';
import { DialogDeletedQuestionComponent } from './components/dialog-deleted-question/dialog-deleted-question.component';
import { ResourcesPageComponent } from './pages/resources-page/resources-page.component';
import { AllResourcesComponent } from './components/resources/all-resources/all-resources.component';
import { OneResourcesComponent } from './components/resources/one-resources/one-resources.component';



@NgModule({
  declarations: [
    UsersPageComponent,
    QuestionsPageComponent,
    AnswersPageComponent,
    LayoutPageComponent,
    PerfilPageComponent,
    AllUsersPageComponent,
    OneUsersPageComponent,
    ReportPageComponent,
    AllReportsComponent,
    OneReportWithDetailComponent,
    ApprovedReportComponent,
    AllQuestionComponent,
    OneQuestionComponent,
    DialogDeletedQuestionComponent,
    ResourcesPageComponent,
    AllResourcesComponent,
    OneResourcesComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
