import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {mechanismTypes} from '../../helpers';

@Component({
  selector: 'app-choose-mechanism-dialog',
  templateUrl: './choose-mechanism-dialog.component.html',
  styleUrls: ['./choose-mechanism-dialog.component.css']
})

export class ChooseMechanismDialogComponent {
  public mechanismStatusName: string;
  public mechanismStatusValue=0;
  public piecesCount: number;
  constructor(
    public dialogRef: MatDialogRef<ChooseMechanismDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  public mechanismTypes = mechanismTypes;

  closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      data:{
        mechanismStatus:this.mechanismStatusValue,
        piecesCount:this.piecesCount
      },
      dataToOrderlineProperties:{
        mechanismStatusName: this.mechanismTypes[this.mechanismStatusValue].viewValue,
        piecesCount: this.piecesCount
      }
    });
  }
}
