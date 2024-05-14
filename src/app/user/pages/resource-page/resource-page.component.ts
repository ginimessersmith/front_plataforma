import { Component, OnInit } from '@angular/core';
import { ResourceCategoryService } from '../../services/resource-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OneResourceInterface } from '../../interface/resources/one-resource.interface';
import { CategoriesResourcesInterface } from '../../interface/categories/categories-resource.interface';
import { OneCategoriesInterface } from '../../interface/categories/OneCategories.interface';
import { Router } from '@angular/router';
import { CreateCategoryInterface } from '../../interface/categories/create-category.interface';
import Swal from 'sweetalert2';
import { ResourceByUserInterface } from '../../interface/resources/resource-by-user.interface';
import { ContentObserver } from '@angular/cdk/observers';
import { CreateResourceInterface } from '../../interface/resources/create-resource.interface';

@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.css']
})
export class ResourcePageComponent implements OnInit {

  public oneResource!: OneResourceInterface
  public listResources!: OneResourceInterface[]
  public categoryWithResource!: CategoriesResourcesInterface
  public OneCategories!: OneCategoriesInterface
  public listCategories!: OneCategoriesInterface[]
  public file!: File
  public isCreateCategory: boolean = false
  public isCreateResource: boolean = false
  public resourceByUser!: ResourceByUserInterface[]
  public inProgress: boolean = false

  public categoryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required], []]
  })

  public resourceForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required], []],
    categoryId: [0, [Validators.required], []]
  })

  constructor(
    private resourceCategoryService: ResourceCategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.findAllCategories()
    this.findMyResources()
    // console.log({resor:this.resourceByUser})
  }

  createCategory() {
    const { name } = this.categoryForm.value
    const createCategoryInterface: CreateCategoryInterface = { name }
    this.resourceCategoryService.createCategory(createCategoryInterface)
      .subscribe({
        next: (resp) => {
          Swal.fire('', 'Categoria creada', 'success')
          this.findAllCategories()
        },
        error: (err) => {
          Swal.fire('', 'Error al crear la categoria', 'error')
        }
      })

  }

  createResource() {
    this.inProgress = true
    const { description, categoryId } = this.resourceForm.value
    const createResourceInterface: CreateResourceInterface = {
      description,
      categoryId,
      files: this.file,
    }
    // console.log({ description, categoryId, file: this.file })
    this.resourceCategoryService.createResource(createResourceInterface)
      .subscribe({
        next: () => {
          Swal.fire('', 'El recurso fue creado con exito', 'success')
          this.inProgress = false
        },
        error: (err) => {
          console.log({ err })
          Swal.fire('', 'error al crear el recurso', 'error')
          this.inProgress = false
        }
      })

  }

  findAllCategories() {
    this.resourceCategoryService.findAllCategories()
      .subscribe({
        next: (response) => {
          this.listCategories = response
        },
        error: () => { }
      })
  }

  goToCategory(id: number) {
    localStorage.setItem('idCategory', JSON.stringify(id))
    this.router.navigateByUrl('/user/one-category')
  }

  seeFormCreateCategory() {
    this.isCreateCategory = !this.isCreateCategory
  }

  seeFormCreateResource() {
    this.isCreateResource = !this.isCreateResource
  }

  findMyResources() {
    this.resourceCategoryService.findResourceByUser()
      .subscribe({
        next: (response) => {
          this.resourceByUser = response
          // console.log({response})
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      console.log('Archivo seleccionado:', this.file);
    }
  }
}
