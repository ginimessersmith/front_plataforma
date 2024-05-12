import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { Router } from '@angular/router';
import { FindOneQuestionInterface } from 'src/app/user/interface/question/finOneQuestion-response';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRespondInterface } from '../../../interface/question/create-respond.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-one-question-page',
  templateUrl: './one-question-page.component.html',
  styleUrls: ['./one-question-page.component.css']
})
export class OneQuestionPageComponent implements OnInit {

  public isResponse: boolean = false
  public idQuestion!: number
  public question!: FindOneQuestionInterface
  public user!: LoginResponseInterface

  public respondForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required], []]
  })

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    const idLocal = JSON.parse(localStorage.getItem('idQuestion')!)

    this.idQuestion = +idLocal
    this.user = JSON.parse(localStorage.getItem('userData')!)

    this.questionService.findOneQuestion(this.idQuestion)
      .subscribe({
        next: (response) => {
          this.question = response
          console.log({ response: this.question })
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  seeRespondForm() {
    this.isResponse = !this.isResponse
  }

  sendRespond() {
    const { description } = this.respondForm.value
    const createRespondInterface: CreateRespondInterface = {
      description,
      questionId: this.idQuestion,
      userId: this.user.user.id
    }

    this.questionService.sendResponse(createRespondInterface)
      .subscribe({
        next: () => {
          Swal.fire('', 'Respuesta enviada', 'success')
          this.isResponse = !this.isResponse
          this.findOneQuestion()
        },
        error: () => {
          Swal.fire('', 'Erro al enviar la respuesta', 'error')
        }
      })
  }

  findOneQuestion() {
    this.questionService.findOneQuestion(this.idQuestion)
      .subscribe({
        next: (response) => {
          this.question = response
          console.log({ response: this.question })
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  goBack(){
    this.router.navigateByUrl('/user/forum')
  }
}
