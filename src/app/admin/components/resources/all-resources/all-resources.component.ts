import { Component, Input } from '@angular/core';
import { OneResourceInterface } from 'src/app/user/interface/resources/one-resource.interface';
import { ResourceCategoryService } from '../../../../user/services/resource-category.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'admin-all-resources',
  templateUrl: './all-resources.component.html',
  styleUrls: ['./all-resources.component.css']
})
export class AllResourcesComponent {

  @Input() allResources!: OneResourceInterface[]
  public spinner:boolean = false
  public displayColumns: string[] = [
    'description',
    'createdAt',
    'filename',
    'path_url',
    'name',
    'options'
  ]

  public Dialog = new DialogComponent(this.dialog)

  constructor(
    private resourceCategoryService: ResourceCategoryService,
    private dialog:MatDialog,
  ) { }

  deleteResource(id:number){
    this.spinner = true
    this.resourceCategoryService.deleteResource(id)
    .subscribe({
      next:(res)=>{
        const message:string ='El recurso fue eliminado con exito'
        const title:string ='Eliminacion del recurso'
        this.Dialog.openDialogSuccess(message,title)
        this.findAllResources()
        this.spinner = false
      },
      error:(err)=>{
        console.log({err})
        const message:string ='Hubo un error al eliminar el recurso por favor revise su conexion a la red'
        const title:string ='Erro al Eliminar el Recurso'
        this.Dialog.openDialogSuccess(message,title)
        this.spinner = false
      }
    })
  }

  findAllResources() {
    this.resourceCategoryService.findAllResource()
      .subscribe({
        next: (res) => {
          this.allResources = res
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

}
