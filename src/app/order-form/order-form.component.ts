import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_ORDER, SET_PANEL_STATE, SET_STEP} from '../redux/redux.actions';
import {locations} from '../helpers';
import {MatDialog} from '@angular/material';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import {OrderService} from './order.service';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {Subscription} from 'rxjs/Subscription';

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
  private subscriptions:Subscription[] = [];
  constructor(private orderService:OrderService, private ngRedux: NgRedux<IAppState>, private dialog: MatDialog) { }

  ngOnInit(){
    const subscription = this.state$.subscribe((s) => {
      this.state = s;
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s=>s.unsubscribe());
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
    const dialogRef = this.dialog.open(OrderFinalProcessComponent,{data:this.state.order.totalAmount});
    const subscription = dialogRef.afterClosed().subscribe(data => {
      if(data){
        if(!data.answer) return;
          Object.assign(this.state.order, data.order);
          const orderClone = {...this.state.order};
          this.orderService.postOrder(orderClone)
            .subscribe(response => {
              console.log(response);
            });
        }
    });
    this.subscriptions.push(subscription);
  }

  public saveOrder() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {data:{status:1}});
      const subscription = dialogRef.afterClosed().subscribe(data => {
      if(data){
        if(!data.answer) return;
        Object.assign(this.state.order, data.order);
        const orderClone = {...this.state.order};
        this.orderService.postOrder(orderClone)
          .subscribe(response => {
            console.log(response);
          });
      }
    });
      this.subscriptions.push(subscription);
  }
}



