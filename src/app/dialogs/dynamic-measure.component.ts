import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderLineModel} from '../models/order-line.model';

@Component({
  selector: 'app-dynamic-measure',
  template: `
    <app-orderline
      [orderline]="orderline"
      [orderlinesDetails]="orderlinesDetails"
      [count]="count"
      [isEdit]="false"
      (orderlinesEmitter)="closeDialog($event)" (closeForm)="cancel()"></app-orderline>
  `,
  styles: [`
    .form-field{
      width:65%
    }
    .mechanismStatusIcons:not(.mat-button-toggle-disabled){
      color: darkslateblue;
    }
  `]
})
export class DynamicMeasureComponent {
  public orderline: OrderLineModel;
  public orderlinesDetails: any[] = [];
  public orderlineProperties: any = {};
  public count: number = 1;
  constructor(
    public dialogRef: MatDialogRef<DynamicMeasureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderline = data.orderline;
    this.count = data.count
  }

  public cancel(){
    console.log("cancel fired")
    this.dialogRef.close();
  }

  public closeDialog(orderlines?: OrderLineModel[]) {
    this.dialogRef.close({
      orderlines:orderlines
    });
  }
}
