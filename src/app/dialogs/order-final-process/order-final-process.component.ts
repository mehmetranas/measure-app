import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderLineModel} from '../../models/order-line.model';

@Component({
  selector: 'app-order-final-process',
  templateUrl: './order-final-process.component.html',
  styleUrls: ['./order-final-process.component.css']
})
export class OrderFinalProcessComponent implements OnInit {
  public order:any = {};
  public deposit = 0;
  public orderline: OrderLineModel = new OrderLineModel();
  constructor(
    public dialogRef: MatDialogRef<OrderFinalProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(){
    this.order = this.data;
  }

  closeDialog(answer=false): void {

  }
}
