import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { ResourcePageComponent } from './pages/resource-page/resource-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'perfil', component: PerfilPageComponent },
      { path: 'resource', component: ResourcePageComponent },
      { path: 'forum', component: ForumPageComponent },
      { path: 'setting', component: SettingPageComponent },
      { path: '**', redirectTo: 'perfil' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
