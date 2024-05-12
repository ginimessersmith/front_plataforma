import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
