
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FindAllQuestionInterface } from 'src/app/user/interface/question/findAllQuestion-response';

@Component({
  selector: 'admin-all-question',
  templateUrl: './all-question.component.html',
  styleUrls: ['./all-question.component.css']
})
export class AllQuestionComponent implements OnInit {

  @Input() allQuestion!: FindAllQuestionInterface[]

  public id!: number
  @Output() idEmit = new EventEmitter<number>()

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

  constructor() { }

  onClick(id: number) {
    this.id = id
    this.emitValue()

  }

  emitValue() {
    this.idEmit.emit(this.id)
  }


}
