import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseInterface } from 'src/app/auth/interface';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.css']
})
export class PerfilPageComponent implements OnInit {
  public userData!: LoginResponseInterface
  constructor(
    private router:Router
  ) {}
  ngOnInit(): void {

    const userLocal: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    this.userData = userLocal
    console.log({user:this.userData})
  }

  goToUpdate(){
    this.router.navigateByUrl('/user/update-user')
  }

}
