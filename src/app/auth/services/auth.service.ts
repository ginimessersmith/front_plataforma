import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInterface, LoginResponseInterface, RegisterInterface } from '../interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  register(registerUser: RegisterInterface): Observable<boolean> {
    const url = `${this.baseUrl}/users/signup`
    return this.http.post<boolean>(url, registerUser)
  }

  login(loginUser: LoginInterface): Observable<LoginResponseInterface> {
    const url = `${this.baseUrl}/users/login`
    return this.http.post<LoginResponseInterface>(url, loginUser)
  }
}
