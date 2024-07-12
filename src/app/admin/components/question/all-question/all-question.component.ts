
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FindAllQuestionInterface } from 'src/app/user/interface/question/findAllQuestion-response';
import { QuestionService } from '../../../../user/services/question.service';
import { PageEvent } from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
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
  selector: 'admin-all-question',
  templateUrl: './all-question.component.html',
  styleUrls: ['./all-question.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class AllQuestionComponent implements OnInit {

  @Input() allQuestion!: FindAllQuestionInterface

  public id!: number
  @Output() idEmit = new EventEmitter<number>()

  public currentPage: number = 1
  public pageSize: number = 5

  displayedColumns: string[] = [
    'title',
    'content',
    'status',
    'createdAt',
    'User',
    'options'

  ]

  ngOnInit(): void {

  }

  constructor(
    private questionService: QuestionService
  ) { }

  onClick(id: number) {
    this.id = id
    this.emitValue()

  }

  emitValue() {
    this.idEmit.emit(this.id)
  }

  findAllQuestion(currentPage: number, pageSize: number) {
    this.questionService.findAllQuestion(currentPage, pageSize)
      .subscribe({
        next: (res) => {
          this.allQuestion = res
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  onChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1
    this.pageSize = event.pageSize;
    console.log({ currentPage: this.currentPage })
    console.log({ pageSize: this.pageSize })
    this.findAllQuestion(this.currentPage, this.pageSize)
  }



}
