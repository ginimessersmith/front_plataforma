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
  public file!: File
  announcer = inject(LiveAnnouncer);
  public inProgress: boolean = false

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
    this.inProgress = !this.inProgress
    const userLocal: LoginResponseInterface = JSON.parse(localStorage.getItem('userData')!)
    const { title, content } = this.createQuestionForm.value
    const createQuestionInterface: CreateQuestionInterface = {
      title,
      content,
      tags: this.tags,
      idUser: userLocal.user.id
    }

    if (this.file) createQuestionInterface.files = this.file
    // console.log({createQuestionInterface})
    this.questionService.createQuestion(createQuestionInterface)
      .subscribe({
        next: () => {
          Swal.fire('', 'La pregunta se guardo con exito', 'success')
          this.router.navigateByUrl('/user/forum')
          this.inProgress = !this.inProgress
        },
        error: (err) => {
          console.log({ err })
          Swal.fire('Error', 'Se ha detectado contenido OFENSIVO o INAPROPIADO en su pregunta', 'error')
          this.inProgress = !this.inProgress
          this.router.navigateByUrl('/user/forum')
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
}
