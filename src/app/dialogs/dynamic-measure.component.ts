import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderLineModel} from '../models/order-line.model';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';

@Component({
  selector: 'app-dynamic-measure',
  template: `
    <div class="row">
      <button mat-icon-button mat-dialog-close>
        <mat-icon>clear</mat-icon>
      </button>
    </div>
   <ng-container *ngIf="isEdit; else view">
     <app-orderline
       [orderline]="orderline"
       [orderlinesDetails]="orderlinesDetails"
       [orderlineProperties]="orderlineProperties"
       [count]="count"
       (orderlinesEmitter)="closeDialog($event)" (closeForm)="cancel()"></app-orderline>
   </ng-container>
   <ng-template #view>
     <app-orderline-view [orderline]="orderline" 
                         (editEmit)="isEdit=true"
                         (deleteEmit)="closeDialog([orderline], 'delete')"
                         [orderlineProperties]="orderlineProperties"></app-orderline-view>
   </ng-template>
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
  public isEdit: boolean = false;
  public orderline: OrderLineModel;
  public orderlinesDetails: any[] = [];
  public count: number = 1;
  constructor(
    private orderlinePropertiesService: OrderlinePropertyService,
    public dialogRef: MatDialogRef<DynamicMeasureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderline = data.orderline;
    this.count = data.count;
    this.isEdit = data.isEdit;
    console.log(this.orderline)
  }

  get orderlineProperties(){
    return this.orderlinePropertiesService.getProductOption(this.orderline.product.productValue);
  }

  public cancel(){
    this.dialogRef.close();
  }

  public closeDialog(orderlines?: OrderLineModel[], action="add") {
    this.dialogRef.close({
      orderlines:orderlines,
      action:action
    });
  }
}
