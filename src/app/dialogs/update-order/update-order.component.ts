import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderModel} from '../../models/order.model';
import {orderStatus} from '../../helpers';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  public dataObj: OrderModel;
  public orderStatus;
  public startDate = new Date();
  constructor(public dialogRef: MatDialogRef<UpdateOrderComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataObj = data;
    this.dataObj.mountDate = this.dataObj.mountDate ? new Date(data.mountDate) : null;
    this.dataObj.measureDate = this.dataObj.measureDate ? new Date(data.measureDate) : null;
    this.dataObj.orderDate = this.dataObj.orderDate ? new Date(data.orderDate) : null;
    this.dataObj.deliveryDate = this.dataObj.deliveryDate ? new Date(data.deliveryDate) : null;
  }

  ngOnInit() {
    this.orderStatus = Object.keys(orderStatus)
      .map((index) => {
        return orderStatus[index];
      });
  }
  public closeDialog(answer){
    this.dialogRef.close({
      answer:answer,
      order:this.dataObj
    })
  }

}
