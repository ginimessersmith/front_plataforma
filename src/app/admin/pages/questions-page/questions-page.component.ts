import { Component, OnInit } from '@angular/core';
import { FindAllQuestionInterface } from 'src/app/user/interface/question/findAllQuestion-response';
import { QuestionService } from '../../../user/services/question.service';
import { FindOneQuestionInterface } from 'src/app/user/interface/question/finOneQuestion-response';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css']
})
export class QuestionsPageComponent implements OnInit {

  public allQuestion!: FindAllQuestionInterface[]
  public idQuestion!:number
  public oneQestion!:FindOneQuestionInterface
  public viewOneQuestion:boolean = false

  constructor(
    private questionService: QuestionService
  ) { }
  ngOnInit(): void {
    this.findAllQuestion()
  }

  findAllQuestion() {
    this.questionService.findAllQuestion()
      .subscribe({
        next: (res) => {
          this.allQuestion = res
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  changeId(id:number){
    this.idQuestion = id
    this.viewOneQuestion = !this.viewOneQuestion
    this.findOneQuestion()
  }

  changeViewOneQuestion(newValue:boolean){
    this.viewOneQuestion = newValue
    this.findAllQuestion()
  }

  findOneQuestion(){
    this.questionService.findOneQuestion(this.idQuestion)
    .subscribe({
      next:(res)=>{
        this.oneQestion = res
      },
      error:(err)=>{
        console.log({err})
      }
    })

  }

}
