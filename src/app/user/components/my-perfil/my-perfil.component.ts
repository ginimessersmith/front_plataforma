import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseInterface } from 'src/app/auth/interface';

@Component({
  selector: 'user-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent {
  @Input() userData!: LoginResponseInterface

  constructor(
    private router:Router
  ){}

  goToUpdate() {
    this.router.navigateByUrl('/user/update-user')
  }

}
