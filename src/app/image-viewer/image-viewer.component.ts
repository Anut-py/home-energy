import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  @Input() imageName: string;
  @Input() width: number;

  dialogRef: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  showDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(dialog, { minWidth: '50%' });
  }
}
