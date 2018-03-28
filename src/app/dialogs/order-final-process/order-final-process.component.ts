import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-order-final-process',
  templateUrl: './order-final-process.component.html',
  styleUrls: ['./order-final-process.component.css']
})
export class OrderFinalProcessComponent implements OnInit {
  public totalAmount = 0;
  public depositeAmount:number = 0;
  public deliveryDate: Date;
  public mountDate: Date;
  public measureDate: Date;
  public orderStatus: number;
  public startDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<OrderFinalProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  ngOnInit(){
    this.totalAmount = this.data.totalAmount;
    this.orderStatus = this.data.orderStatus;
    this.depositeAmount = this.data.depositeAmount;
  }

  public closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      order:{
        depositeAmount:this.depositeAmount,
        totalAmount:this.totalAmount-this.depositeAmount,
        deliveryDate:this.deliveryDate,
        measureDate: this.measureDate,
        mountDate:this.mountDate,
        orderStatus:this.orderStatus
      }
    })
  }
}
