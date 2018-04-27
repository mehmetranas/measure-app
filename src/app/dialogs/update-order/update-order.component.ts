import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
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
    this.dataObj = this.data.order;
    this.dataObj.measureDate = this.dataObj.measureDate ? new Date(this.data.order.measureDate) : null;
    this.dataObj.orderDate = this.dataObj.orderDate ? new Date(this.data.order.orderDate) : null;
    this.dataObj.deliveryDate = this.dataObj.deliveryDate ? new Date(this.data.order.deliveryDate) : null;
  }

  ngOnInit() {
    if (this.data.isProcess) {
    this.orderStatus = orderStatus.filter((os: any) => {
      return os.value !== 4 && os.value !== 5;
    });
    } else { this.orderStatus = orderStatus; }
  }
  public closeDialog(answer) {
    if (this.dataObj.orderStatus !== 1) { this.dataObj.measureDate = null; }
    if (this.dataObj.orderStatus === 6) { this.dataObj.deliveryDate = null; }
    this.dialogRef.close({
      answer: answer,
      order: this.dataObj
    });
  }
}
