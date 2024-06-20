import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FindOneQuestionInterface } from 'src/app/user/interface/question/finOneQuestion-response';
import { QuestionService } from '../../../../user/services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'admin-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent {


  public Dialog = new DialogComponent(this.dialog)
  @Input() oneQuestion!: FindOneQuestionInterface

  public viewOneQuestion: boolean = false
  @Output() viewOneQuestionEmit = new EventEmitter<boolean>()

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog
  ) { }

  onClick() {
    this.emitValue()
  }

  emitValue() {
    this.viewOneQuestionEmit.emit(this.viewOneQuestion)
  }

  deleteQuestion(id: number) {
    this.questionService.deleteOneQuestion(id)
      .subscribe({
        next: (res) => {
          const message: string = `El proceso que se ejecuta es totalmente destructivo`
          const title: string = `Eliminacion permante`
          this.Dialog.openDialogError(message, title)
          this.emitValue()
        },
        error: (err) => {
          console.log({ err })
          const message: string = `Hubo un error al ejecutar la eliminacion de la pregunta`
          const title: string = `Error`
          this.Dialog.openDialogError(message, title)
        }
      })
  }

}
