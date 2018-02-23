import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderModel} from '../../models/order.model';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  public dataObj: OrderModel;

  constructor(public dialogRef: MatDialogRef<UpdateOrderComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataObj = data;
    console.log(this.dataObj)
  }

  ngOnInit() {
  }
  closeDialog(answer){
    this.dialogRef.close({
      answer:answer,
      order:this.dataObj
    })
  }

}
