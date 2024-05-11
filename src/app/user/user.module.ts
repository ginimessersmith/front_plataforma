import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ResourcePageComponent } from './pages/resource-page/resource-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    PerfilPageComponent,
    ResourcePageComponent,
    SettingPageComponent,
    ForumPageComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class UserModule { }
