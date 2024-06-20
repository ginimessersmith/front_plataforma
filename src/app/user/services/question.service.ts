import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateQuestionInterface } from '../interface/question/create-question.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { FindAllQuestionInterface } from '../interface/question/findAllQuestion-response';
import { FindOneQuestionInterface } from '../interface/question/finOneQuestion-response';
import { CreateRespondInterface } from '../interface/question/create-respond.interface';
import { searchInterface } from '../interface/search/search.interface';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  createQuestion(createQuestionInterface: CreateQuestionInterface): Observable<boolean> {

    const url = `${this.baseUrl}/questions`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const option = { headers }

    const formData = new FormData()
    formData.append('title', createQuestionInterface.title)
    for (let tag of createQuestionInterface.tags) {
      formData.append('tags[]', tag);
    }
    formData.append('content', createQuestionInterface.content)
    if (createQuestionInterface.files) formData.append('files', createQuestionInterface.files)
    console.log({ url, formData, option })
    return this.http.post<boolean>(url, formData, option)
      .pipe(
        catchError(error => {
          return throwError(() => { new Error(error.error?.message || 'Unknown error') })
        })
      )
  }

  findAllQuestion(): Observable<FindAllQuestionInterface[]> {
    const url = `${this.baseUrl}/questions`
    return this.http.get<FindAllQuestionInterface[]>(url)
  }

  findOneQuestion(id: number): Observable<FindOneQuestionInterface> {
    const url = `${this.baseUrl}/questions/${id}`
    return this.http.get<FindOneQuestionInterface>(url)
  }

  sendResponse(createRespondInterface: CreateRespondInterface): Observable<boolean> {
    const url = `${this.baseUrl}/responses`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })
    const formData = new FormData();
    formData.append('description', createRespondInterface.description)
    if (createRespondInterface.url_extern) formData.append('url_extern', createRespondInterface.url_extern)
    formData.append('questionId', createRespondInterface.questionId.toString())
    if (createRespondInterface.files) formData.append('files', createRespondInterface.files, createRespondInterface.files.name)


    const option = { headers }

    return this.http.post<boolean>(url, formData, option)
  }

  deleteOneQuestion(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/questions/${id}`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const option = { headers }

    return this.http.delete<boolean>(url, option)
  }

  reportQuestion(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/questions/report/${id}`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })
    const body: any = {}
    return this.http.post<boolean>(url, body, { headers })
  }

  reportResponse(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/responses/report/${id}`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })
    const body: any = {}
    return this.http.post<boolean>(url, body, { headers })
  }

  questionByUser(): Observable<FindAllQuestionInterface[]> {
    const url = `${this.baseUrl}/questions/v1/user`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const options = { headers }
    return this.http.get<FindAllQuestionInterface[]>(url, options)
  }

  searchQuestion(search:searchInterface):Observable<FindAllQuestionInterface[]>{
    const url = `${this.baseUrl}/questions/v1/search`
    let params = new HttpParams();

    if (search.query) {
      params = params.set('query', search.query);
    }

    if (search.startDate) {
      params = params.set('startDate', search.startDate);
    }

    if (search.endDate) {
      params = params.set('endDate', search.endDate);
    }

    if (search.tag) {
      params = params.set('tag', search.tag);
    }

    return this.http.get<FindAllQuestionInterface[]>(url, { params });
  }
}
