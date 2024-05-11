import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from '../../interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public loginForm:FormGroup = this.formBuilder.group({
    email:['',[Validators.required],[]],
    password:['',[Validators.required],[]]
  })

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }

  onLogin(){
    const {email,password } = this.loginForm.value

    const loginInterface:LoginInterface = {
      email,
      password
    }

    this.authService.login(loginInterface)
    .subscribe({
      next:()=>{
        Swal.fire('','Iniciado con exito','success')
        this.router.navigateByUrl('/user/perfil')
      },
      error:(err)=>{
        console.log({err})
        Swal.fire('','No se puede iniciar sesion','error')
      },
    })

  }
}
