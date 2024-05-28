import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { Router } from '@angular/router';
import { FindOneQuestionInterface } from 'src/app/user/interface/question/finOneQuestion-response';
import { LoginResponseInterface } from 'src/app/auth/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRespondInterface } from '../../../interface/question/create-respond.interface';
import Swal from 'sweetalert2';
import { PointService } from '../../../services/point.service';
import { LikeAnswerInterface } from '../../../interface/points/like-answer.interface';
import { UnLikeAnswerInterface } from 'src/app/user/interface/points/unlike-answer.interface';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
  selector: 'user-one-question-page',
  templateUrl: './one-question-page.component.html',
  styleUrls: ['./one-question-page.component.css']
})
export class OneQuestionPageComponent implements OnInit {

  public file!: File
  public isResponse: boolean = false
  public idQuestion!: number
  public inProgress: boolean = false
  public question!: FindOneQuestionInterface
  public user!: LoginResponseInterface

  public respondForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required], []],
    url_extern: ['', [], []]
  })

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private pointService: PointService,
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
    this.inProgress = !this.inProgress
    const { description, url_extern } = this.respondForm.value
    const createRespondInterface: CreateRespondInterface = {
      description,
      questionId: this.idQuestion,
      userId: this.user.user.id
    }

    if (url_extern) {
      if (url_extern.includes('youtube.com')) {
        const embedUrl = this.transformYouTubeLink(url_extern)
        if (embedUrl) {
          createRespondInterface.url_extern = embedUrl
        } else {
          createRespondInterface.url_extern = url_extern
        }
      }
    }
    if (this.file) createRespondInterface.files = this.file

    // console.log({createRespondInterface})
    this.questionService.sendResponse(createRespondInterface)
      .subscribe({
        next: () => {
          this.inProgress = !this.inProgress
          this.isResponse = !this.isResponse
          this.findOneQuestion()
          Swal.fire('', 'Respuesta enviada', 'success')
        },
        error: () => {
          this.inProgress = !this.inProgress
          this.findOneQuestion()
          Swal.fire('', 'Respuesta enviada', 'success')
          // Swal.fire('', 'Erro al enviar la respuesta', 'error')
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

  goBack() {
    this.router.navigateByUrl('/user/forum')
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      console.log('Archivo seleccionado:', this.file);
    }
  }

  transformYouTubeLink(url: string): string | null {

    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    if (match && match[1]) {

      return `https://www.youtube.com/embed/${match[1]}`
    } else {

      return null
    }
  }

  esImagen(url: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  }

  goToTag(tag: { id: number, name: string }) {
    localStorage.setItem('Tag', JSON.stringify(tag))
    this.router.navigateByUrl('/user/one-tag')
  }

  like(idRespond: number) {
    console.log(idRespond)
    const LikeAnswer: LikeAnswerInterface = { responseId: idRespond }
    this.pointService.likeAnswer(LikeAnswer)
    .subscribe({
      next:(response)=>{
        console.log({response})
      },
      error:(err)=>{
        console.log({err})
      }
    })
  }

  unLike(idRespond: number) {
    console.log(idRespond)
    const UnLikeAnswer: UnLikeAnswerInterface = { responseId: idRespond }
    this.pointService.unLikeAnswer(UnLikeAnswer)
    .subscribe({
      next:(response)=>{
        console.log({response})
      },
      error:(err)=>{
        console.log({err})
      }
    })
  }

}
