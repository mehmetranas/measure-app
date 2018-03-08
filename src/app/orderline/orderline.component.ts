import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {fontTypes, piles} from '../helpers';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {
  @Output() submitForm: EventEmitter<any> = new EventEmitter();
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

  constructor(private orderlinePropertiesService: OrderlinePropertyService) {}

  ngOnInit() {
    this.orderlineProperties =
      this.orderlinePropertiesService.getProductOption(this.orderline.product.productValue || -1);
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

}
