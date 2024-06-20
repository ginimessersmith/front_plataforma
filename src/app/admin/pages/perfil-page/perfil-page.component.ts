import { Component, OnInit } from '@angular/core';
import { LoginResponseInterface } from 'src/app/auth/interface';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.css']
})
export class PerfilPageComponent implements OnInit{
  public user!:LoginResponseInterface
  ngOnInit(): void {
    const userDataLocal = localStorage.getItem('userData')
    if(userDataLocal) this.user = JSON.parse(userDataLocal)
  }


}
