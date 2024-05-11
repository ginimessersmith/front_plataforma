import { Component, Input, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

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
export class LayoutPageComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;//? agregar para usar el sidenav.toggle();

  collapsed=signal(false)

  sidenavWidth = computed(()=>this.collapsed()?'65px':'250px')

  profilePicSize=computed(()=>this.collapsed()?'32' : '100')

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {

  }



  menuItem = signal<MenuItem[]>([

    // {
    //   icon:'content_copy',
    //   label:'Recursos',
    //   route:'/auth/login'
    // },
    {
      icon:'person',
      label:'Mi Perfil',
      route:'/user/perfil'
    },
    {
      icon:'content_copy',
      label:'Recursos',
      route:'/user/resource'
    },
    {
      icon:'forum',
      label:'Foro',
      route:'/user/forum'
    },
    {
      icon:'settings',
      label:'Ajustes',
      route:'/user/setting'
    },
  ])

  onLogout(){
    localStorage.clear()
    this.router.navigateByUrl('/dashboard')
  }
}
