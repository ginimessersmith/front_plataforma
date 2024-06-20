import { Component, OnInit } from '@angular/core';
import { ReportInterface } from '../../interface/report/report.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {

  public allReports!: ReportInterface[]
  public viewOneReport: boolean = false
  public id!: number

  ngOnInit(): void {
    this.findAllReports()
  }

  constructor(
    private reportService: ReportService
  ) { }

  findAllReports() {
    this.reportService.findAllReports()
      .subscribe({
        next: (res) => {
          this.allReports = res
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  changeValues(newId: number) {
    this.id = newId
    this.viewOneReport = true
    this.findAllReports()
  }

  changeViewOneReport(newValue: boolean) {
    this.viewOneReport = newValue
    this.findAllReports()
  }

}
