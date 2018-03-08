import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {fontTypes, piles} from '../helpers';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {
  @Output() submitOrderlines: EventEmitter<any> = new EventEmitter();
  @Output() closeForm: EventEmitter<any> = new EventEmitter();
  @Input() orderline: OrderLineModel;
  @Input() directionRight: boolean;
  @Input() directionLeft: boolean;
  @Input() count: number = 1;
  @Input() orderlinesDetails: any[] = [];
  public orderlineProperties: any = {};
  public piles: any = {};
  public fontTypes: any = {};
  public alertShow: boolean = false;
  public isProgressive: boolean = false;

  constructor(private orderlinePropertiesService: OrderlinePropertyService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.orderlineProperties =
      this.orderlinePropertiesService.getProductOption(this.orderline.product.productValue);
    this.piles = piles;
    this.fontTypes = fontTypes;
    if(this.count>1) this.setOrderlinePieces();
  }

  private setOrderlinePieces(){
    this.orderlinesDetails = [];
    for(let i=0; i<this.count; i++){
      this.orderlinesDetails.push(
        {
          propertyWidth: null,
          propertyHeight: null,
          direction:null
        });
    }
  }

  public calculateOrderline() {
    console.log("Hesaplanmdı....")
  }

  public prepareOrderlines(){
    if(this.orderlineProperties.fonType) {
      if(!this.orderline.fonType){
        this.snackBar.open("Fon Tipi boş bırakılamaz.","Hata",{
          duration:5000
        });
        return;
      }
    }
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
    this.submitOrderlines.emit(orderlines);
  }

}
