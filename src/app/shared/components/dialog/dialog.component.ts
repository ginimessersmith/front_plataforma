import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(public dialog: MatDialog) { }

  openDialogSuccess(message: string, title: string) {
    this.dialog.open(DialogElementsSuccess, {
      data: { message, title }
    });
  }

  openDialogError(message: string, title: string) {
    this.dialog.open(DialogElementsError, {
      data: { message, title }
    });
  }
}

@Component({
  selector: 'dialog-elements-success-dialog',
  templateUrl: 'dialog-success.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogElementsSuccess {
  public message: string = '';
  public title: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogElementsSuccess>) {
    this.message = data.message;
    this.title = data.title;
  }
}

@Component({
  selector: 'dialog-elements-error-dialog',
  templateUrl: 'dialog-error.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogElementsError {
  public message: string = '';
  public title: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogElementsError>) {
    this.message = data.message;
    this.title = data.title;
  }
}
