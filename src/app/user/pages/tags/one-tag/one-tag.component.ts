import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionByTagInterface } from 'src/app/user/interface/tag/questionByTag.interface';
import { TagService } from 'src/app/user/services/tag.service';


@Component({
  selector: 'app-one-tag',
  templateUrl: './one-tag.component.html',
  styleUrls: ['./one-tag.component.css']
})
export class OneTagComponent implements OnInit {

  public questionByTag!: QuestionByTagInterface[]
  public tag!: { id: number, name: string }

  constructor(
    private tagService: TagService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.tag = JSON.parse(localStorage.getItem('Tag')!)
    this.FindQuestionByTagInterface(this.tag.id)

  }

  FindQuestionByTagInterface(id: number) {
    this.tagService.questionByTag(id)
      .subscribe({
        next: (response) => {
          this.questionByTag = response
          console.log({ response })
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  findOneTag() {

  }

  gotToBack() {
    localStorage.removeItem('Tag')
    this.router.navigateByUrl('/user/forum')
  }
}
