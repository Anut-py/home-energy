import { Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'home-energy';
  dialogRef: MatDialogRef<any>;
  constructor(private dialog: MatDialog) {}

  showDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(dialog, { minWidth: '50%' });
  }
}
