import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {SET_PANEL_STATE, SET_STEP} from '../redux/redux.actions';
import {locations} from '../helpers';
import {MatDialog} from '@angular/material';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((state: IAppState) => state.orderlines) orderlines$;
  @select((s: IAppState) =>
  {return {
    customer: s.customerForm,
    order: s.order,
    stepper: s.stepper,
    orderlineInProcess: s.orderlineInProcess}}) state$;
  public locations = locations;
  public state: any = {};
  public orderlineProperties: any = {};
  private subscription;
  constructor(private ngRedux: NgRedux<IAppState>, private dialog: MatDialog) { }

  ngOnInit(){
    this.subscription = this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public getOrderlineProperties(orderlineProperties) {
    this.orderlineProperties = orderlineProperties;
  }

  public setStep(value) {
    this.ngRedux.dispatch({type: SET_STEP, value: value});
  }


  public measureFormClosed(state=true){
    this.ngRedux.dispatch({type: SET_PANEL_STATE, statusOfClosed:{
        panelMeasure: state
      }});
  }

  public measureFormOpened() {
    this.setStep(1);
    this.measureFormClosed(false);
  }

  public completeOrder() {
    this.dialog.open(OrderFinalProcessComponent,{data:this.state.order})
  }
}



