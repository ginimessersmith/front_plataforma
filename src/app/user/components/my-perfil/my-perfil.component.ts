import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { AllPointsInterface } from '../../interface/points/all-points.interface';

@Component({
  selector: 'user-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent {
  @Input() userData!: LoginResponseInterface
  @Input() totalPoint!:AllPointsInterface

  constructor(
    private router:Router
  ){}

  goToUpdate() {
    this.router.navigateByUrl('/user/update-user')
  }

}
