import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../../user/services/user.service';
import { UserInterface } from 'src/app/user/interface/user/user.interface';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';

@Component({
  selector: 'dialog-overview-example',
  templateUrl: './dialog-overview-example.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
})
export class DialogOverviewExample {

  constructor(public dialog: MatDialog) { }

  openDialog(user: UserInterface) {
    return this.dialog.open(DialogOverviewExampleDialog, {
      data: { user: user },
    });
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule],
})
export class DialogOverviewExampleDialog {

  @Output() userBanned = new EventEmitter<void>();
  public user!: UserInterface;


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserInterface },
    private userService: UserService
  ) {
    this.user = data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  bannedUser() {
    this.userService.deleteUser(this.user.id)
      .subscribe({
        next: (res) => {
          console.log({ res });
          this.userBanned.emit();
          this.onNoClick();
        },
        error: (err) => {
          console.log({ err });
          this.onNoClick();
        },
      });
  }

}
