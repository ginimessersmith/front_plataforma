import { Component, OnInit, inject } from '@angular/core';
import { FindAllQuestionInterface } from '../../interface/question/findAllQuestion-response';
import { FindOneQuestionInterface } from '../../interface/question/finOneQuestion-response';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { searchInterface } from '../../interface/search/search.interface';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {

  public questionList!: FindAllQuestionInterface[]
  public question!: FindOneQuestionInterface
  public Dialog = new DialogComponent(this.dialog)
  public inSearch:boolean = false

  ngOnInit(): void {
    this.findAllQuestion()
  }

  public searchForm:FormGroup = this.formBuilder.group({
    query:['',[],[]],
    startDate:['',[],[]],
    endDate:['',[],[]],
    tag:['',[],[]],
  })

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog:MatDialog,
  ) { }

  goToCreateQuestion() {
    this.router.navigateByUrl('/user/create-question')
  }

  goToQuestion(id: number) {

    localStorage.setItem('idQuestion', JSON.stringify(id))
    this.router.navigateByUrl('/user/one-question')

  }

  goToTags() {
    this.router.navigateByUrl('/user/all-tags')
  }

  goToTag(tag: {id:number,name:string}) {
    localStorage.setItem('Tag', JSON.stringify(tag))
    this.router.navigateByUrl('/user/one-tag')
  }

  reportQuestion(id:number){
    // console.log(id)
    this.questionService.reportQuestion(id)
    .subscribe({
      next:(res)=>{
        if(res){
          const message:string ='El reporte fue enviado exitosamente'
          const title:string ='Reporte'
          this.Dialog.openDialogSuccess(message,title)
        }else{
          const message:string ='Hubo un error al reportar la pregunta'
          const title:string ='Error Reporte'
          this.Dialog.openDialogSuccess(message,title)
        }
        this.findAllQuestion()
      },
      error:(err)=>{
        console.log({err})
        const message:string ='Error al reportar'
          const title:string ='Error Reporte'
          this.Dialog.openDialogSuccess(message,title)
      }
    })
  }

  findAllQuestion(){
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

  search(){
    this.inSearch = true
    const {query,
      startDate,
      endDate,
      tag,} = this.searchForm.value

      const searchInterface:searchInterface ={}

      if(query || query !=='') searchInterface.query = query

      if(startDate || startDate !=='') {
        const formattedStartDate = this.formatDate(new Date(startDate));
        searchInterface.startDate = formattedStartDate
      }

      if(endDate || endDate !=='') {
        const formattedEndDate = this.formatDate(new Date(endDate));
        searchInterface.endDate = formattedEndDate
      }

      if(tag || tag !=='') searchInterface.tag = tag

      // console.log({searchInterface})

      this.questionService.searchQuestion(searchInterface)
      .subscribe({
        next:(res)=>{
          console.log({res})
          this.questionList = res
          this.inSearch = false
        },
        error:(err)=>{
          this.inSearch = false
          console.log({err})
        }
      })


  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
