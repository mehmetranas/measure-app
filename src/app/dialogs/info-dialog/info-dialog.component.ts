import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {orderStatus} from '../../helpers';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit{
  public dataObj;
  public orderStatusObj;
  public isToBeMeasureDisplay:boolean;
  public isToBeMeasure:boolean;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataObj=data;
  }

  ngOnInit(){
    this.orderStatusObj=orderStatus[Object.keys(orderStatus)[this.dataObj.statusValue]];
    if(this.dataObj.statusValue === orderStatus['Eksik Sipariş'].value)
      this.isToBeMeasureDisplay=this.dataObj.isToBeMeasureDisplay;
  }

  public closeDialog(answer=false): void {
    let orderStatusValue;
    if(this.isToBeMeasureDisplay&&!this.isToBeMeasure)
      orderStatusValue=orderStatus['Ölçüye Gidilecek'].value;
    else if(this.isToBeMeasureDisplay&&this.isToBeMeasure)
      orderStatusValue=orderStatus['Eksik Sipariş'].value;
    else
      orderStatusValue=this.dataObj.statusValue;
    this.dialogRef.close({
      answer:answer,
      order:{
        orderStatus:orderStatusValue
      }
    })
  }
}
