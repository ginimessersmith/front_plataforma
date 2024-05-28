import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { environment } from 'src/environments/environment';
import { AllPointsInterface } from '../interface/points/all-points.interface';
import { AllPointsByUserInterface } from '../interface/points/all-points-by-user.interface';
import { UnLikeAnswerInterface } from '../interface/points/unlike-answer.interface';
import { LikeAnswerInterface } from '../interface/points/like-answer.interface';
import { DownloadResourceInterface } from '../interface/points/download-resource.interface';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  public baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) { }

  findAllPoint(): Observable<AllPointsInterface> {
    const url = `${this.baseUrl}/points/`
    const userData: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token: string = userData.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const options = { headers }

    return this.http.get<AllPointsInterface>(url, options)
  }

  findAllPointByUser(): Observable<AllPointsByUserInterface[]> {
    const url = `${this.baseUrl}/points/user`
    const userData: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token: string = userData.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const options = { headers }

    return this.http.get<AllPointsByUserInterface[]>(url, options)

  }

  unLikeAnswer(UnLikeAnswerInterface: UnLikeAnswerInterface): Observable<boolean> {
    const url = `${this.baseUrl}/points/unlike`
    const userData: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token: string = userData.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const options = { headers }
    return this.http.post<boolean>(url, UnLikeAnswerInterface,options)
  }

  likeAnswer(LikeAnswerInterface: LikeAnswerInterface): Observable<boolean> {
    const url = `${this.baseUrl}/points/like`
    const userData: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token: string = userData.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const options = { headers }

    return this.http.post<boolean>(url, LikeAnswerInterface, options)

  }

  verifyDownloadResources(downloadResource: DownloadResourceInterface): Observable<boolean> {
    const url = `${this.baseUrl}/points/like`
    const userData: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token: string = userData.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const options = { headers }

    return this.http.post<boolean>(url, downloadResource, options)
  }

}
