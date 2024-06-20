import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportDetailsInterface } from 'src/app/admin/interface/report/report-details.interface';
import { ReportService } from '../../../services/report.service';
import { HandleReport } from '../../../interface/report/handle-report.interface';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'admin-one-report-with-detail',
  templateUrl: './one-report-with-detail.component.html',
  styleUrls: ['./one-report-with-detail.component.css']
})
export class OneReportWithDetailComponent implements OnInit {

  public Dialog = new DialogComponent(this.dialog)
  public oneReport!: ReportDetailsInterface
  @Input() id!: number

  viewAllReport: boolean = false
  @Output() viewAllReportEmit = new EventEmitter<boolean>()

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findOneReport()
  }

  onclick() {
    this.emitValue()
  }

  findOneReport() {
    this.reportService.findOneReportWithDetails(this.id)
      .subscribe({
        next: (res) => {
          this.oneReport = res
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  emitValue() {
    this.viewAllReportEmit.emit(this.viewAllReport)
  }

  approveReport() {

    const { id } = this.oneReport
    const handleReport: HandleReport = {
      isApproved: true
    }

    this.reportService.handleReport(handleReport, id)
      .subscribe({
        next: () => {
          const message = `El reporte fue aprobado`
          const title = `Reporte`
          this.Dialog.openDialogSuccess(message, title)
          this.emitValue()
        },
        error: () => {
          const message = `El reporte no fue aprobado, por favor verifique su conexion a internet`
          const title = `Error  de Reporte`
          this.Dialog.openDialogSuccess(message, title)
        }
      })
  }

  rejectReport() {

    const { id } = this.oneReport
    const handleReport: HandleReport = {
      isApproved: false
    }

    this.reportService.handleReport(handleReport, id)
      .subscribe({
        next: () => {
          const message = `La publicacion fue rechazada`
          const title = `Reporte`
          this.Dialog.openDialogSuccess(message, title)
          this.emitValue()
        },
        error: () => {
          const message = `El reporte no fue aprobado, por favor verifique su conexion a internet`
          const title = `Error  de Reporte`
          this.Dialog.openDialogSuccess(message, title)
        }
      })
  }

}
