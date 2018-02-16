import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {orderStatus} from '../../helpers';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {
  public dataObj;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataObj=data;
  }

  ngOnInit() {
  }

  public closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      order:{
        orderStatus:orderStatus['Eksik Sipariş'].value
      }
    })
  }


}
