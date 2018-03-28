import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderModel} from '../../models/order.model';

@Component({
  selector: 'app-order-final-process',
  templateUrl: './order-final-process.component.html',
  styleUrls: ['./order-final-process.component.css']
})
export class OrderFinalProcessComponent implements OnInit {
  public startDate = new Date();
  public order: OrderModel = new OrderModel();
  constructor(
    public dialogRef: MatDialogRef<OrderFinalProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  ngOnInit(){
    this.order = this.data;
    this.order.measureDate = this.order.measureDate ? new Date(this.data.measureDate) : null;
    this.order.orderDate = this.order.orderDate ? new Date(this.data.orderDate) : null;
    this.order.deliveryDate = this.order.deliveryDate ? new Date(this.data.deliveryDate) : null;
  }

  public closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      order: this.order
    })
  }
}
