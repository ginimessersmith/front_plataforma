import { Component, inject } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { CreateQuestionInterface } from '../../../interface/question/create-question.interface';
import { LoginInterface, LoginResponseInterface } from 'src/app/auth/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-question-page',
  templateUrl: './create-question-page.component.html',
  styleUrls: ['./create-question-page.component.css']
})
export class CreateQuestionPageComponent {
  public tags: string[] = []
  announcer = inject(LiveAnnouncer);

  public createQuestionForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required], []],
    content: ['', [Validators.required], []],
  })

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  removeKeyword(keyword: string) {
    const index = this.tags.indexOf(keyword);
    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  onCreateQuestion() {
    const userLocal: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const { title, content } = this.createQuestionForm.value
    const createQuestionInterface: CreateQuestionInterface = {
      title,
      content,
      tags: this.tags,
      idUser: userLocal.user.id
    }
    this.questionService.createQuestion(createQuestionInterface)
    .subscribe({
      next:()=>{
        Swal.fire('','La pregunta se guardo con exito','success')
        this.router.navigateByUrl('/user/forum')
      },
      error:(err)=>{
        console.log({err})
        Swal.fire('','Hubo un error al guardar la pregunta','error')
      }
    })
  }

  goBack(){
    this.router.navigateByUrl('/user/forum')
  }
}
