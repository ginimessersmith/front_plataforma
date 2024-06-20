import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceByUserInterface } from '../../interface/resources/resource-by-user.interface';
import { ResourceCategoryService } from '../../services/resource-category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'user-my-resources',
  templateUrl: './my-resources.component.html',
  styleUrls: ['./my-resources.component.css']
})
export class MyResourcesComponent {

  @Input() resourceByUser!: ResourceByUserInterface[]
  public inProgressResourceTrue:boolean = true
  public inProgressResourceFalse:boolean = false

  @Output() progressTrueEmit = new EventEmitter<boolean>()
  @Output() progressFalseEmit = new EventEmitter<boolean>()
  @Output() resourceByUserEmit = new EventEmitter<ResourceByUserInterface[]>()

  public Dialog = new DialogComponent(this.dialog)
  constructor(
    private resourceCategoryService:ResourceCategoryService,
    private dialog:MatDialog,
  ){}

  deleteResource(id:number){
    this.emitValueTrue()
    this.resourceCategoryService.deleteResource(id)
    .subscribe({
      next:(res)=>{
        const message:string ='El recurso fue eliminado con exito'
        const title:string ='Recurso'
        this.Dialog.openDialogSuccess(message,title)
        this.emitValueFalse()
        this.findMyResources()
      },
      error:(err)=>{
        console.log({err})
        const message:string ='Hubo un error al eliminar un recurso, por favor verifique la conexion a la red'
        const title:string ='Error '
        this.Dialog.openDialogSuccess(message,title)
      }
    })
  }

  emitValueTrue(){
    this.progressTrueEmit.emit(this.inProgressResourceTrue)
  }

  emitValueFalse(){
    this.progressFalseEmit.emit(this.inProgressResourceFalse)
  }

  findMyResources() {
    this.resourceCategoryService.findResourceByUser()
      .subscribe({
        next: (response) => {
          this.resourceByUser = response
          this.emitResources()
          // console.log({response})
        },
        error: (err) => {
          console.log({ err })
        }
      })
  }

  emitResources(){
    this.resourceByUserEmit.emit(this.resourceByUser)
  }

}
