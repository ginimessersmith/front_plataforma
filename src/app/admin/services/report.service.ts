import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportDetailsInterface } from '../interface/report/report-details.interface';
import { ReportInterface } from '../interface/report/report.interface';
import { HandleReport } from '../interface/report/handle-report.interface';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { FindAllReportsInterface } from '../interface/report/FindAllReports.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl:string = environment.baseUrl

  constructor(
    private http:HttpClient
  ) { }

  findAllReports(currentPage:number,pageSize:number):Observable<FindAllReportsInterface>{
    const url:string =`${this.baseUrl}/reports`
    let params = new HttpParams();
    params = params.append('page', currentPage.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<FindAllReportsInterface>(url,{params})
  }

  findOneReportWithDetails(id:number):Observable<ReportDetailsInterface>{
    const url:string =`${this.baseUrl}/reports/${id}`
    return this.http.get<ReportDetailsInterface>(url)
  }

  handleReport(handleReport:HandleReport,id:number):Observable<boolean>{
    const url:string =`${this.baseUrl}/reports/${id}`
    const user: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const token = user.token

    const headers = new HttpHeaders({
      'authorization': token
    })

    const option = { headers }
    return this.http.post<boolean>(url,handleReport,option)
  }

}
