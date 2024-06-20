import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { AnswersPageComponent } from './pages/answers-page/answers-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { ResourcesPageComponent } from './pages/resources-page/resources-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'perfil', component: PerfilPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'questions', component: QuestionsPageComponent },
      { path: 'answer', component: AnswersPageComponent },
      { path: 'reports', component: ReportPageComponent },
      { path: 'resources', component: ResourcesPageComponent },
      { path: '**', redirectTo: 'perfil' },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
