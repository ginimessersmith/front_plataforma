import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../services/tag.service';
import { Router } from '@angular/router';
import { TagInterface } from 'src/app/user/interface/tag/tag.interface';
import { QuestionByTagInterface } from '../../../interface/tag/questionByTag.interface';

@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrls: ['./all-tags.component.css']
})
export class AllTagsComponent implements OnInit {

  public listTag!: TagInterface[]

  constructor(
    private tagService: TagService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllTags()
  }

  findAllTags() {
    this.tagService.findAllTags()
      .subscribe({
        next: (response) => {
          this.listTag = response
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  goToBack() {
    localStorage.removeItem('Tag')
    this.router.navigateByUrl('/user/forum')
  }

  goToTag(itemTag: TagInterface) {
    const tag = { id: itemTag.id, name: itemTag.name }
    localStorage.setItem('Tag', JSON.stringify(tag))
    this.router.navigateByUrl('/user/one-tag')
  }

}
