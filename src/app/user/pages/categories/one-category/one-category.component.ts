import { Component, OnInit } from '@angular/core';
import { ResourceCategoryService } from '../../../services/resource-category.service';
import { CategoriesResourcesInterface } from '../../../interface/categories/categories-resource.interface';

@Component({
  selector: 'app-one-category',
  templateUrl: './one-category.component.html',
  styleUrls: ['./one-category.component.css']
})
export class OneCategoryComponent implements OnInit {

  public idCategory!: number
  public categoriesResources!: CategoriesResourcesInterface

  ngOnInit(): void {
    this.idCategory = JSON.parse(localStorage.getItem('idCategory')!)
    this.findCategory()
  }

  constructor(
    private resourceCategoryService: ResourceCategoryService,
  ) { }

  findCategory() {
    this.resourceCategoryService.findOneCategoryWithResources(this.idCategory)
      .subscribe({
        next: (response) => {
          this.categoriesResources = response
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

}
