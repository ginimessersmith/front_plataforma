import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TagInterface } from '../interface/tag/tag.interface';
import { QuestionByTagInterface } from '../interface/tag/questionByTag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  public baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) { }

  findAllTags(): Observable<TagInterface[]> {
    const url = `${this.baseUrl}/tags`
    return this.http.get<TagInterface[]>(url)
  }

  questionByTag(id: number): Observable<QuestionByTagInterface[]> {
    const url = `${this.baseUrl}/tags/${id}`
    return this.http.get<QuestionByTagInterface[]>(url)
  }


}
