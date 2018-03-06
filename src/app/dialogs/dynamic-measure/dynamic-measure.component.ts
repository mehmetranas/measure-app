import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderlinePropertyService} from '../../order-line-form/orderline-property.service';
import {OrderLineModel} from '../../models/order-line.model';
import {fontTypes, piles} from '../../helpers';
import {OrderlineService} from '../../order-line-form/orderline.service';

@Component({
  selector: 'app-dynamic-measure',
  templateUrl: './dynamic-measure.component.html',
  styleUrls: ['./dynamic-measure.component.css']
})
export class DynamicMeasureComponent implements OnInit {
  public orderline: OrderLineModel;
  public orderlinesDetails: any[] = [];
  public orderlineProperties: any = {};
  public directionRight: boolean;
  public directionLeft: boolean;
  public piles: any = {};
  public fontTypes: any = {};
  public count: number = 1;
  public alertShow: boolean = false;
  public isProgressive: boolean = false;
  constructor(
    private orderlinePropertiesService: OrderlinePropertyService,
    public dialogRef: MatDialogRef<DynamicMeasureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.orderline = data.orderline;
    this.count = data.count
  }

  ngOnInit() {
    this.orderlineProperties =
      this.orderlinePropertiesService.getProductOption(this.data.orderline.product.productValue);
    this.piles = piles;
    this.fontTypes = fontTypes;
    if(this.data.count>1) this.setOrderlinePieces();
  }

  private setOrderlinePieces(){
    this.orderlinesDetails = [];
      for(let i=0; i<this.data.count; i++){
        this.orderlinesDetails.push({propertyWidth: null, propertyHeight: null, direction:null});
    }
  }

  public submitForm(){
    let orderlines: OrderLineModel[] = [];
    if(this.orderlinesDetails.length>0) { // if store, tül store or zebra is selected
        this.orderlinesDetails.forEach((orderline,i) => {
          orderlines.push({...this.orderline,...orderline})
        });
    }else if (this.directionLeft || this.directionRight){
      if(this.directionLeft){
        orderlines.push({...this.orderline,...{direction:1}})
      }
      if(this.directionRight){
        orderlines.push({...this.orderline,...{direction:2}})
      }
    } else {
      orderlines.push(this.orderline);
    }
    this.closeDialog(orderlines);
  }

  private closeDialog(orderlines: OrderLineModel[]) {
    this.dialogRef.close({
      orderlines:orderlines
    });
  }
}
