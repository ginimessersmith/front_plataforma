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
import { CreateQuestionPageComponent } from './pages/question/create-question-page/create-question-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OneQuestionPageComponent } from './pages/question/one-question-page/one-question-page.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';
import { AllTagsComponent } from './pages/tags/all-tags/all-tags.component';
import { OneTagComponent } from './pages/tags/one-tag/one-tag.component';
import { OneCategoryComponent } from './pages/categories/one-category/one-category.component';





@NgModule({
  declarations: [
    LayoutPageComponent,
    PerfilPageComponent,
    ResourcePageComponent,
    SettingPageComponent,
    ForumPageComponent,
    CreateQuestionPageComponent,
    OneQuestionPageComponent,
    UpdateUserComponent,
    AllTagsComponent,
    OneTagComponent,
    OneCategoryComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
