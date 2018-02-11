import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
  public mechanismTypes =[
    {value: 0, viewValue: 'Tek Kasa'},
    {value: 1, viewValue: 'Parçalı'},
    {value: 2, viewValue: 'Tek Kasa + Çoklu Mekanizma'}
  ];

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
