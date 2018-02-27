import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderLineModel} from '../../models/order-line.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderlineService} from '../orderline.service';
import {MatSnackBar} from '@angular/material';
import {piles,fontTypes} from '../../helpers';
import {OrderModel} from '../../models/order.model';
import {OrderlineFormService} from '../orderline-form.service';

@Component({
  selector: 'app-dynamic-order-line',
  templateUrl: './dynamic-order-line.component.html',
  styleUrls: ['./dynamic-order-line.component.css']
})
export class DynamicOrderLineComponent implements OnInit, OnDestroy {
  @Input() orderlineProperties: any = {};
  @Input() globalForm: any;
  @Input() stepper: any = {};
  @Input() order: OrderModel;
  @Input() orderline: OrderLineModel;
  @Input('orderlines') globalOrderlines: any[];
  @ViewChild('dynamicForm') form;
  public orderlines: any[] = [];
  public directionRight = false;
  public directionLeft = false;
  private subscriptions: Subscription[] = [];
  public piles = piles;
  public fontTypes = fontTypes;

  constructor(private orderlineService: OrderlineService,
              private orderlineFormService: OrderlineFormService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(){
    const subscription = this.orderlineFormService.orderlineFormState
      .subscribe((result: any) =>{
          if(result.measureFormClosed)
            this.setOrderlinePieces();
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public checkForm() {
      if(!this.globalForm.valid) {
        alert('Ölçü alanlarını eksiksiz doldurduğunuzdan emin misiniz?');
        return;
      }else this.submitForm()
   }

  private submitForm() {
    let updatedOrderlines = [];
    if(this.orderlines.length>0){
      this.orderlines.forEach((orderline) => {
        updatedOrderlines.push(Object.assign(this.orderline,orderline));
      });
    }
    else if(this.directionRight)
        updatedOrderlines.push(Object.assign(this.orderline,{direction:1}));
    else if(this.directionLeft)
        updatedOrderlines.push(Object.assign(this.orderline,{direction:2}));
    else{
      this.postAndAddState([this.orderline])
      return;
    } // check method later
      this.postAndAddState(updatedOrderlines);
  }

  private postAndAddState(orderlines: OrderLineModel[]){
      orderlines.forEach((orderline,index) => {
        this.orderlineService.add(orderline as OrderLineModel)
          .subscribe((response: OrderLineModel) => {
          orderline = {...orderline,product:{...orderline.product},...response}; // merge orderline and response after add DB
          this.order.totalAmount = response.order.totalAmount;
          this.globalOrderlines.push(orderline);
            if(index === orderlines.length-1) {
              this.openSnackBar('Ölçüler eklendi','Tamam');
              this.form.reset();
              this.orderlineFormService.orderlineFormState.emit({orderlineFormPosted:true});
              this.stepper.count = 1;
            }
        });
    });
  }

  private openSnackBar(message: string, action: string){
    this.snackBar.open(message,action,{
      duration: 2000,
    });
  }

  private setOrderlinePieces(){
    this.orderlines = [];
    if(this.orderlineProperties.piecesCount){
      console.log(this.orderlineProperties)
      for(let i=0; i<this.orderlineProperties.piecesCount; i++){
        this.orderlines.push({propertyWidth: null, propertyHeight: null, direction:null});
      }
    }
  }
    public attachSizeOfPile(value: number){
    if(value === 0) return;
    this.orderline.sizeOfPile = value;
    }
}



