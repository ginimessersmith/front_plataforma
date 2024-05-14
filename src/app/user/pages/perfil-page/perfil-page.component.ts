import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { RespondByUserInterface } from '../../interface/user/respond-by-user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.css']
})
export class PerfilPageComponent implements OnInit {

  public userData!: LoginResponseInterface
  public responses!: RespondByUserInterface[]
  public panelOpenState = false;
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }
  ngOnInit(): void {

    const userLocal: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    this.userData = userLocal
    this.getResponseByUser()
  }

  goToUpdate() {
    this.router.navigateByUrl('/user/update-user')
  }

  getResponseByUser() {
    this.userService.getResponseByUser()
      .subscribe({
        next: (response) => {
          this.responses = response
        },
        error: (err) => {
          console.log({err})
         }
      })
  }

}
