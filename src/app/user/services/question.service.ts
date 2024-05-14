import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateQuestionInterface } from '../interface/question/create-question.interface';
import { Observable } from 'rxjs';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { FindAllQuestionInterface } from '../interface/question/findAllQuestion-response';
import { FindOneQuestionInterface } from '../interface/question/finOneQuestion-response';
import { CreateRespondInterface } from '../interface/question/create-respond.interface';
import { FocusMonitor } from '@angular/cdk/a11y';

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

    return this.http.post<boolean>(url, createQuestionInterface, option)
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

}
