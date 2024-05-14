import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionByTagInterface } from '../interface/tag/questionByTag.interface';
import { CreateResourceInterface } from '../interface/resources/create-resource.interface';
import { CreateCategoryInterface } from '../interface/categories/create-category.interface';
import { OneResourceInterface } from '../interface/resources/one-resource.interface';
import { CategoriesResourcesInterface } from '../interface/categories/categories-resource.interface';
import { OneCategoriesInterface } from '../interface/categories/OneCategories.interface';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { ResourceByUserInterface } from '../interface/resources/resource-by-user.interface';

@Injectable({
  providedIn: 'root'
})
export class ResourceCategoryService {

  public baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  createResource(createResource: CreateResourceInterface): Observable<boolean> {
    const url = `${this.baseUrl}/resources`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })
    const options = { headers }

    const formData = new FormData();
    if (createResource.files) formData.append('files', createResource.files, createResource.files.name)
    formData.append('description', createResource.description)
    formData.append('categoryId', createResource.categoryId.toString())

    return this.http.post<boolean>(url, formData, options)
  }

  createCategory(createCategory: CreateCategoryInterface): Observable<boolean> {
    const url = `${this.baseUrl}/categories`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })
    const options = { headers }
    return this.http.post<boolean>(url, createCategory, options)
  }

  findOneResource(id: number): Observable<OneResourceInterface> {
    const url = `${this.baseUrl}/resources/${id}`
    return this.http.get<OneResourceInterface>(url)
  }

  findAllResource(): Observable<OneResourceInterface[]> {
    const url = `${this.baseUrl}/resources`
    return this.http.get<OneResourceInterface[]>(url)
  }

  findOneCategoryWithResources(id: number): Observable<CategoriesResourcesInterface> {
    const url = `${this.baseUrl}/categories/${id}`
    return this.http.get<CategoriesResourcesInterface>(url)
  }

  findAllCategories(): Observable<OneCategoriesInterface[]> {
    const url = `${this.baseUrl}/categories/`
    return this.http.get<OneCategoriesInterface[]>(url)
  }

  findResourceByUser(): Observable<ResourceByUserInterface[]> {

    const url = `${this.baseUrl}/resources/v1/user`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })
    const options = { headers }
    return this.http.get<ResourceByUserInterface[]>(url, options)
  }

}
