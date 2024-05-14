import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UpdateUserInterface } from '../../../interface/user/update-user.interface';
import { LoginResponseInterface } from 'src/app/auth/interface';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  public file!: File
  public updateUserForm: FormGroup = this.formBuilder.group({
    name: ['', [], []],
    email: ['', [Validators.email], []],
    phone: [0, [Validators.minLength(8), Validators.maxLength(8)], []]
  })
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

  updateUser() {
    const { name, email, phone } = this.updateUserForm.value
    const userData: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const idUser: number = userData.user.id
    const updateUserInterface: UpdateUserInterface = {}

    if (name) {
      updateUserInterface.name = name
      userData.user.name = name
      localStorage.setItem('userData', JSON.stringify(userData))
    }
    if (email) {
      updateUserInterface.email = email
      userData.user.email = email
      localStorage.setItem('userData', JSON.stringify(userData))
    }

    if (phone) {
      updateUserInterface.phone = phone
      userData.user.phone = phone
      localStorage.setItem('userData', JSON.stringify(userData))
    }

    this.userService.updateUser(idUser, updateUserInterface)
      .subscribe({
        next: () => {
          this.openSnackBar('Actualizacion realizada', 'ok')
        },
        error: (err) => {
          console.log({ err })
          Swal.fire('', 'Error al realizar la actualizacion', 'error')
        }
      })
    // console.log({ updateUserInterface, idUser })
  }

  goBack() {
    this.router.navigateByUrl('user/perfil')
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      console.log('Archivo seleccionado:', this.file);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'start',
      verticalPosition: 'top'
    });
  }
}
