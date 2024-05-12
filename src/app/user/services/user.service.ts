import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserInterface } from '../interface/user/update-user.interface';
import { environment } from 'src/environments/environment';
import { LoginInterface, LoginResponseInterface } from 'src/app/auth/interface';
import { Observable } from 'rxjs';

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

    const headers = new HttpHeaders({
      'authorization': user.token
    })

    const options = {
      headers
    }

    return this.http.put<boolean>(url, updateUser, options)
  }
}
