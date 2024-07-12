import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportInterface } from 'src/app/admin/interface/report/report.interface';
import { ReportService } from '../../../services/report.service';
import { FindAllReportsInterface } from 'src/app/admin/interface/report/FindAllReports.interface';
import {Injectable} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `Primera Pagina`;
  itemsPerPageLabel = `Items por pagina:`;
  lastPageLabel = `Ultima Pagina`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Siguiente Pagina';
  previousPageLabel = 'Pagina anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Pagina 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} de ${amountPages}`;
  }
}


@Component({
  selector: 'admin-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class AllReportsComponent {

  public id!: number

  @Output() idEmit = new EventEmitter<number>()

  @Input() allReports!: FindAllReportsInterface

  public currentPage: number = 1
  public pageSize: number = 5

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

  findAllReports(currentPage:number,pageSize:number){
    this.reportService.findAllReports(currentPage,pageSize)
    .subscribe({
      next:(res)=>{
        this.allReports = res
      },
      error:(err)=>{
        console.log({err})
      }
    })
  }

  onChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1
    this.pageSize = event.pageSize;
    console.log({currentPage:this.currentPage})
    console.log({pageSize:this.pageSize})
    this.findAllReports(this.currentPage,this.pageSize)
  }

}
