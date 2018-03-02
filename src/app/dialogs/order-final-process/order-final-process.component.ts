import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {orderStatus} from '../../helpers';

@Component({
  selector: 'app-order-final-process',
  templateUrl: './order-final-process.component.html',
  styleUrls: ['./order-final-process.component.css']
})
export class OrderFinalProcessComponent implements OnInit {
  public totalAmount = 0;
  public deposit:number = 0;
  public deliveryDate = new Date();
  public mountDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<OrderFinalProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  }

  ngOnInit(){
    this.totalAmount = this.data;
  }

  public closeDialog(answer=false): void {
    this.dialogRef.close({
      answer:answer,
      order:{
        depositeAmount:this.deposit,
        totalAmount:this.totalAmount-this.deposit,
        deliveryDate:this.deliveryDate,
        mountDate:this.mountDate,
        orderStatus:orderStatus['Sipariş Kaydı Alındı'].value
      }
    })
  }
}
