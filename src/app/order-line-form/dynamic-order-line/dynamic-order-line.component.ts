import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ADD_ORDER_LINE, UPDATE_ORDER_LINE, UPDATE_STEP} from '../../redux/redux.actions';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';
import {OrderLineModel} from '../../models/order-line.model';
import {Subscription} from 'rxjs/Subscription';
import {IPanelsState} from '../../redux/stores/panels.store';
import {OrderlineService} from '../orderline.service';
import {IOrderlineState} from '../../redux/stores/orderline.store';
import {tassign} from 'tassign';

@Component({
  selector: 'app-dynamic-order-line',
  templateUrl: './dynamic-order-line.component.html',
  styleUrls: ['./dynamic-order-line.component.css']
})
export class DynamicOrderLineComponent implements OnInit, OnDestroy {
  @Input() locationTypeByProperties: any = {};
  @select((state:IAppState) => state.orderline) orderline$;
  @select((state: IAppState) => state.panels) panels$;
  public orderline = new OrderLineModel();
  public isSkirtSelected = false;
  public isBeadSelected = false ;
  public orderlines: OrderLineModel[] = [];
  private subscriptions: Subscription[] = [];
  public piles = [
    {value:'Amerikan Pile', viewValue:'Amerikan Pile'},
    {value:'Kanun Pile', viewValue:'Kanun Pile'},
    {value:'Yan Pile', viewValue:'Yan Pile'},
    {value:'Diğer', viewValue:'Diğer'}
  ];
  private orderlineFormValid: boolean;

  constructor(private ngRedux: NgRedux<IAppState>, private orderlineService: OrderlineService) {
  }

  ngOnInit() {
    const subscriptionPanel = this.panels$.subscribe((panel: IPanelsState) => {
      if(panel.statusOfClosed.panelMeasure)
        this.setOrderlinePieces();
    });
    this.subscriptions.push(subscriptionPanel);
    const subscriptionOrderline = this.orderline$.subscribe((orderline: IOrderlineState) => {
      Object.assign(this.orderline,orderline.orderline);
      this.orderlineFormValid = orderline.orderlineForm.isValid;
    });
    this.subscriptions.push(subscriptionOrderline);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public updateStep(value) {
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }

  public submitForm() {

    if(!this.checkFormValidation()) {
      alert("Adam gibi Doldur hacı");
      return;
    }
    if(this.orderlines.length>0){
      for(let orderline of this.orderlines){
        Object.assign(orderline,this.orderline);
        console.log(orderline);
        this.orderlineService.add(orderline).subscribe(s => console.log(s))
      }
    }else{
      console.log(this.orderline);
      this.orderlineService.add(this.orderline).subscribe(s => {
      const updatedOrderline = tassign(this.orderline, s);
      console.log(updatedOrderline);
      this.ngRedux.dispatch({type:UPDATE_ORDER_LINE, orderline:updatedOrderline})
      });
    }
  }

  private checkFormValidation(): boolean {
    return this.orderlineFormValid;
  }

  private setOrderlinePieces(){
    this.orderlines = [];
    if(this.locationTypeByProperties.piecesCount){
      for(let i=0; i<this.locationTypeByProperties.piecesCount; i++){
        this.orderlines.push(new OrderLineModel());
      }
    }
  }
}

