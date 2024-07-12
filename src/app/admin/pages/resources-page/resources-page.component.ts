import { Component, OnInit } from '@angular/core';
import { OneResourceInterface } from 'src/app/user/interface/resources/one-resource.interface';
import { ResourceCategoryService } from '../../../user/services/resource-category.service';
import { FindAllResourceInterface } from 'src/app/user/interface/resources/findAllResources.interface';
import {Injectable} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `Primera Pagina`;
  itemsPerPageLabel = `Items por pagina:`;
  lastPageLabel = `Ultima Pagina`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Siguiente Pagina';
  previousPageLabel = 'Pagina anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Pagina 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} de ${amountPages}`;
  }
}


@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class ResourcesPageComponent implements OnInit {
  public allResources!: FindAllResourceInterface
  public currentPage:number = 1
  public pageSize:number = 5
  ngOnInit(): void {
    this.findAllResources()
  }

  constructor(
    private resourceCategoryService: ResourceCategoryService
  ) { }

  findAllResources() {
    this.resourceCategoryService.findAllResource(this.currentPage,this.pageSize)
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
