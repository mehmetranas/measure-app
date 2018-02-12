import {Component, Inject, OnInit,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderLineModel} from '../../models/order-line.model';

@Component({
  selector: 'app-save-orderline',
  templateUrl: './save-orderline.component.html',
  styleUrls: ['./save-orderline.component.css']
})
export class SaveOrderlineComponent implements OnInit {
  public deposit = 0;
  public orderline: OrderLineModel = new OrderLineModel();
  constructor(
    public dialogRef: MatDialogRef<SaveOrderlineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderline = data
  }

   ngOnInit(){}

  closeDialog(): void {}

}
