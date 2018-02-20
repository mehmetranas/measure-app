import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-measured-date',
  templateUrl: './measured-date.component.html',
  styleUrls: ['./measured-date.component.css']
})
export class MeasuredDateComponent {
  public measuredDate:Date;

  constructor(
    public dialogRef: MatDialogRef<MeasuredDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  public closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      measureDate:this.measuredDate
    })
  }

}
