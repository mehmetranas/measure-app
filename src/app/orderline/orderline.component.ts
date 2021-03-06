import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderLineModel} from '../models/order-line.model';
import {fontTypes, piles} from '../helpers';
import {MatSnackBar} from '@angular/material';
import {OrderlineService} from '../order-line-form/orderline.service';

@Component({
  selector: 'app-orderline',
  templateUrl: './orderline.component.html',
  styleUrls: ['./orderline.component.css']
})
export class OrderlineComponent implements OnInit {
  @Output() orderlinesEmitter: EventEmitter<any> = new EventEmitter();
  @Output() closeForm: EventEmitter<any> = new EventEmitter();
  @Input() orderline: OrderLineModel;
  @Input() count: number = 1;
  @Input() orderlinesDetails: any[] = [];
  @Input() orderlineProperties: any = {};
  public fontTypes: any = {};
  public piles: any[] = [];
  public alertShow: boolean = false;
  public isProgressive: boolean = false;
  public calcualteLineAmount = '';
  public usedMaterial: number;

  constructor(private orderlineService: OrderlineService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
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
    if(this.prepareOrderlines())
    this.orderlineService.calculate(<OrderLineModel[]>this.prepareOrderlines())
      .take(1)
      .subscribe((result: any) => {
        this.calcualteLineAmount = `${result.totalAmount.toFixed(1)} TL - ${result.usedMaterial.toFixed(2)} m2`;
      });
  }

  submitOrderlines(){
    if(this.prepareOrderlines())
    this.orderlinesEmitter.emit(<OrderLineModel[]>this.prepareOrderlines())
  }

  private prepareOrderlines(): OrderLineModel[] | boolean {
    if(this.orderlineProperties.fonType) {
      if(!this.orderline.fonType){
        this.snackBar.open("Fon Tipi boş bırakılamaz.","Hata",{
          duration:5000
        });
        return false;
      }
    }
    let orderlines: OrderLineModel[] = [];
    if(this.orderlinesDetails.length>0) { // if store, tül store or zebra is selected
      this.orderlinesDetails.forEach((orderline,i) => {
        orderlines.push({...this.orderline,...orderline})
      });
    }else if (this.orderline.direction === 0){
        orderlines.push({...this.orderline,...{direction:1}});
        orderlines.push({...this.orderline,...{direction:2}});
    } else {
      orderlines.push(this.orderline);
    }
    return orderlines;
  }
}
