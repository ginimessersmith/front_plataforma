import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserInterface } from '../interface/user/update-user.interface';
import { environment } from 'src/environments/environment';
import { LoginInterface, LoginResponseInterface } from 'src/app/auth/interface';
import { Observable } from 'rxjs';
import { RespondByUserInterface } from '../interface/user/respond-by-user.interface';
import { UserInterface } from '../interface/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  updateUser(id: number, updateUser: UpdateUserInterface): Observable<boolean> {
    const url = `${this.baseUrl}/users/${id}`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)

    if (updateUser.image) {
      this.uploadAvatar(updateUser.image).subscribe({
        next: (res) => {
          console.log({ res })
        },
        error: (err) => {
          console.log({ err })
        }
      })
    }

    const headers = new HttpHeaders({
      'authorization': user.token
    })

    const options = {
      headers
    }

    return this.http.put<boolean>(url, updateUser, options)
  }

  getResponseByUser(): Observable<RespondByUserInterface[]> {
    const url = `${this.baseUrl}/responses/v1/user`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const headers = new HttpHeaders({
      'authorization': user.token
    })

    const options = {
      headers
    }

    return this.http.get<RespondByUserInterface[]>(url, options)
  }

  findAllUsers(): Observable<UserInterface[]> {
    const url = `${this.baseUrl}/users/`
    return this.http.get<UserInterface[]>(url)
  }

  findOneUser(id: number): Observable<UserInterface> {
    const url = `${this.baseUrl}/users/${id}`
    return this.http.get<UserInterface>(url)
  }

  deleteUser(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/users/${id}`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'authorization': user.token
    })

    return this.http.delete<boolean>(url, { headers })
  }

  uploadAvatar(image: File): Observable<boolean> {
    const url = `${this.baseUrl}/users/avatar`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)

    const headers = new HttpHeaders({
      'authorization': user.token
    })

    const formData = new FormData()
    formData.append('image', image)

    return this.http.post<boolean>(url, formData,{headers})
  }
}
