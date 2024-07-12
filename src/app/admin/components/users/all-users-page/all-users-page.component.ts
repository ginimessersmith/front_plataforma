import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/user/interface/user/user.interface';
import { UserService } from '../../../../user/services/user.service';
import { DialogOverviewExample } from '../../dialog-banned-user/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FindAllUsersInterface } from 'src/app/user/interface/user/FindAllUsers.interface';
import { Injectable} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
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
  selector: 'admin-all-users-page',
  templateUrl: './all-users-page.component.html',
  styleUrls: ['./all-users-page.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class AllUsersPageComponent implements OnInit {
  @Input() allUsers!: FindAllUsersInterface
  public user!: UserInterface
  private dialogOverviewExample: DialogOverviewExample
  public currentPage:number=1
  public pageSize:number =5

  displayColumns: string[] = [
    'name',
    'email',
    'phone',
    'role',
    'active',
    'createdAt',
    'updatedAt',
    'options'
  ]

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {
    this.dialogOverviewExample = new DialogOverviewExample(this.dialog);
  }

  ngOnInit(): void {

  }

  bannedUser(id: number) {
    this.userService.findOneUser(id)
      .subscribe({
        next: (res) => {
          this.user = res
          const dialogRef = this.dialogOverviewExample.openDialog(res);

          dialogRef.componentInstance.userBanned.subscribe(() => {
            this.loadAllUsers(this.currentPage,this.pageSize);
          });
        },
        error: (err) => {
        }
      })
  }

  loadAllUsers(currentPage:number,pageSize:number) {
    this.userService.findAllUsers(this.currentPage,this.pageSize).subscribe({
      next: (users) => {
        this.allUsers = users;

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1
    this.pageSize = event.pageSize;
    console.log({currentPage:this.currentPage})
    console.log({pageSize:this.pageSize})
    this.loadAllUsers(this.currentPage,this.pageSize)
  }


}
