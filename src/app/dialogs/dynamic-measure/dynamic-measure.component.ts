import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OrderlinePropertyService} from '../../order-line-form/orderline-property.service';
import {OrderLineModel} from '../../models/order-line.model';
import {fontTypes, piles} from '../../helpers';

@Component({
  selector: 'app-dynamic-measure',
  templateUrl: './dynamic-measure.component.html',
  styleUrls: ['./dynamic-measure.component.css']
})
export class DynamicMeasureComponent implements OnInit {
  public orderline: OrderLineModel;
  public orderlines: any[] = [];
  public orderlineProperties: any = {};
  public directionRight: boolean;
  public directionLeft: boolean;
  public piles: any = {};
  public fontTypes: any = {};
  constructor(
    private orderlinePropertiesService: OrderlinePropertyService,
    public dialogRef: MatDialogRef<DynamicMeasureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.orderline = data.orderline;
  }

  ngOnInit() {
    console.log(this.data)
    this.orderlineProperties =
      this.orderlinePropertiesService.getProductOption(this.data.productValue);
    this.piles = piles;
    this.fontTypes = fontTypes;
    if(this.data.count>1) this.setOrderlinePieces();
  }

  private setOrderlinePieces(){
    this.orderlines = [];
      for(let i=0; i<this.data.count; i++){
        this.orderlines.push({propertyWidth: null, propertyHeight: null, direction:null});
    }
  }

  public attachSizeOfPile(value: number){
    if(value === 0) return;
    this.orderline.sizeOfPile = value;
  }

  public closeDialog(answer){

  }
}
