import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/user/interface/user/user.interface';
import { UserService } from '../../../../user/services/user.service';
import { DialogOverviewExample } from '../../dialog-banned-user/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'admin-all-users-page',
  templateUrl: './all-users-page.component.html',
  styleUrls: ['./all-users-page.component.css']
})
export class AllUsersPageComponent implements OnInit {
  @Input() allUsers!: UserInterface[]
  public user!: UserInterface
  private dialogOverviewExample: DialogOverviewExample;

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
            this.loadAllUsers();
          });
        },
        error: (err) => {
        }
      })
  }

  loadAllUsers() {
    this.userService.findAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;

      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
