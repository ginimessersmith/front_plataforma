import { Component, OnInit, inject } from '@angular/core';
import { FindAllQuestionInterface } from '../../interface/question/findAllQuestion-response';
import { FindOneQuestionInterface } from '../../interface/question/finOneQuestion-response';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {

  public questionList!: FindAllQuestionInterface[]
  public question!: FindOneQuestionInterface


  ngOnInit(): void {
    this.questionService.findAllQuestion()
      .subscribe({
        next: (response) => {
          this.questionList = response
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  goToCreateQuestion() {
    this.router.navigateByUrl('/user/create-question')
  }

  goToQuestion(id:number){

    localStorage.setItem('idQuestion',JSON.stringify(id))
    this.router.navigateByUrl('/user/one-question')

  }
}
