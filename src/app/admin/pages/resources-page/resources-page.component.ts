import { Component, OnInit } from '@angular/core';
import { OneResourceInterface } from 'src/app/user/interface/resources/one-resource.interface';
import { ResourceCategoryService } from '../../../user/services/resource-category.service';

@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.css']
})
export class ResourcesPageComponent implements OnInit {
  public allResources!: OneResourceInterface[]

  ngOnInit(): void {
    this.findAllResources()
  }

  constructor(
    private resourceCategoryService: ResourceCategoryService
  ) { }

  findAllResources() {
    this.resourceCategoryService.findAllResource()
      .subscribe({
        next: (res) => {
          this.allResources = res
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }
}
