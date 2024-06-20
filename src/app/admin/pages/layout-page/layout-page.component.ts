import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginResponseInterface } from 'src/app/auth/interface';

export type MenuItem = {
  icon: string
  label: string
  route: string
}


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit  {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;//? agregar para usar el sidenav.toggle();

  collapsed=signal(true)

  sidenavWidth = computed(()=>this.collapsed()?'65px':'250px')

  profilePicSize=computed(()=>this.collapsed()?'32' : '100')
  public userData!: LoginResponseInterface

  menuItem = signal<MenuItem[]>([

    {
      icon:'person',
      label:'Perfil',
      route:'/admin/perfil'
    },
    {
      icon:'group',
      label:'Usuarios del Sistema',
      route:'/admin/users'
    },
    {
      icon:'report',
      label:'Reportes',
      route:'/admin/reports'
    },
    {
      icon:'forum',
      label:'Preguntas del Foro',
      route:'/admin/questions'
    },
    // {
    //   icon:'content_copy',
    //   label:'Respuestas del Foro',
    //   route:'/admin/answer'
    // },
    {
      icon:'cloud_upload',
      label:'Recursos del Foro',
      route:'/admin/resources'
    },


  ])

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    const userLocal: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    this.userData = userLocal
  }


  onLogout(){
    localStorage.clear()
    this.router.navigateByUrl('/dashboard')
  }

  goToForum(){
    this.router.navigateByUrl('/admin/questions')
  }
}
