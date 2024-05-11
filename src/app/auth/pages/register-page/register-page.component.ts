import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterInterface } from '../../interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public registerForm:FormGroup = this.formBuilder.group({
    nombre:['',[Validators.required],[]],
    email:['',[Validators.required],[]],
    password:['',[Validators.required],[]]
  })

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
  ){}

  onRegister(){
    const {nombre,email,password}=this.registerForm.value

    const registerInterface:RegisterInterface={
      email,
      name:nombre,
      password,
      role:'Estudiante'
    }

    this.authService.register(registerInterface)
    .subscribe({
      next:()=>{
        Swal.fire('','Registro con exito','success')
      },
      error:(err)=>{
        console.log(err)
        Swal.fire('','Hubo un problema al registrase','error')
      }
    })

  }

}
