import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportInterface } from 'src/app/admin/interface/report/report.interface';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'admin-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent {

  public id!: number

  @Output() idEmit = new EventEmitter<number>()

  @Input() allReports!: ReportInterface[]
  displayedColumns: string[] = [
    'reason',
    'classification',
    'modelType',
    'status',
    'createdAt',
    'options',
  ]

  constructor(
    private reportService: ReportService
  ) { }

  changeId(id: number) {
    this.id = id
    this.emitValues()
  }

  emitValues() {
    this.idEmit.emit(this.id)
  }

}
