import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { IFrameVideoComponent } from './components/i-frame-video/i-frame-video.component';



@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    IFrameVideoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    IFrameVideoComponent
  ]
})
export class SharedModule { }
