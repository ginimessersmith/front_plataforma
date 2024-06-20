import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from '../../interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public Dialog = new DialogComponent(this.dialog)

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required], []],
    password: ['', [Validators.required], []]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  onLogin() {
    const { email, password } = this.loginForm.value

    const loginInterface: LoginInterface = {
      email,
      password
    }

    this.authService.login(loginInterface)
      .subscribe({
        next: (response) => {

          if (response.user.active) {

            const data = JSON.stringify(response)
            localStorage.setItem('userData', data)

            const message:string= `Ingreso al sistema con exito `
            const title:string =`Inicio de sesion`

            this.Dialog.openDialogSuccess(message,title )
            response.user.role == 'Estudiante' ? this.router.navigateByUrl('/user/perfil')
              : this.router.navigateByUrl('/admin/users')

          } else {

            const message:string= `Error al sistema`
            const title:string =`Usted no esta activado para ingresar al sistema`

            this.Dialog.openDialogSuccess(message,title )
            this.router.navigateByUrl('/auth/login')

          }

        },
        error: (err) => {
          console.log({ err })
          const title:string =`Error al ingresar al sistema`
          const message:string= `Hubo un error al ingresar al sistema, revise su conexion
          o bien sus datos al iniciar sesion`

            this.Dialog.openDialogSuccess(message,title )
        },
      })

  }
}
