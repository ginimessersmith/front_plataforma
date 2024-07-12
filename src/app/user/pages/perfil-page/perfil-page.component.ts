import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { RespondByUserInterface } from '../../interface/user/respond-by-user.interface';
import { UserService } from '../../services/user.service';
import { PointService } from '../../services/point.service';
import { AllPointsInterface } from '../../interface/points/all-points.interface';
import { AllPointsByUserInterface } from '../../interface/points/all-points-by-user.interface';
import { QuestionService } from '../../services/question.service';
import { FindAllQuestionInterface } from '../../interface/question/findAllQuestion-response';
import { QuestionByUserInterface } from '../../interface/question/question-by-user.interface';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.css']
})
export class PerfilPageComponent implements OnInit {

  public userData!: LoginResponseInterface
  public responses!: RespondByUserInterface[]
  public questions!: QuestionByUserInterface[]

  public totalPoint!: AllPointsInterface
  public AllPointsByUser!: AllPointsByUserInterface[]
  public currentPage: number = 1
  public pageSize: number = 10

  constructor(
    private router: Router,
    private userService: UserService,
    private pointService: PointService,
    private questionService: QuestionService
  ) { }
  ngOnInit(): void {

    const userLocal: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    this.userData = userLocal
    this.getResponseByUser()
    this.totalPointByUser()
    this.historyPointUser()
    this.allQuestionByUser()
  }


  getResponseByUser() {
    this.userService.getResponseByUser()
      .subscribe({
        next: (response) => {
          this.responses = response
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  totalPointByUser() {
    this.pointService.findAllPoint()
      .subscribe({
        next: (response) => {
          console.log({ response })
          this.totalPoint = response
          console.log({ totalPoint: this.totalPoint })
        },
        error: () => { }
      })
  }

  historyPointUser() {
    this.pointService.findAllPointByUser()
      .subscribe({
        next: (reponse) => {
          this.AllPointsByUser = reponse
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  allQuestionByUser() {
    this.questionService.questionByUser()
      .subscribe({
        next: (res) => {
          this.questions = res
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

}
