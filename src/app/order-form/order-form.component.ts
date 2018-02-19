import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_ORDER, SET_PANEL_STATE, SET_STEP} from '../redux/redux.actions';
import {locations, orderStatus} from '../helpers';
import {MatDialog} from '@angular/material';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import {OrderService} from './order.service';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

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
  private subscription:Subscription = new Subscription();
  constructor(private orderService:OrderService, private ngRedux: NgRedux<IAppState>, private dialog: MatDialog) { }

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

  public completeOrder(status:number) {
    const statusObj = orderStatus[Object.keys(orderStatus)[status]];
    if(statusObj==orderStatus['Sipariş Kaydı Alındı'])
      this.completedOrder();
    else if(statusObj==orderStatus['Ölçüye Gidilecek'] || statusObj==orderStatus['Eksik Sipariş'])
      this.saveOrder(statusObj);
  }

  private completedOrder() {
    const dialogRef = this.dialog.open(OrderFinalProcessComponent,{data:this.state.order.totalAmount});
    dialogRef.afterClosed()
      .takeWhile(data => data.order)
      .subscribe(data => {
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
  }

  private saveOrder(statusObj:any) {
    const dialogRef = this.dialog.open(InfoDialogComponent,
      {data:{status:statusObj},
              maxWidth:350});
      dialogRef.afterClosed()
        .takeWhile(data=>data.order)
        .subscribe(data => {
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
  }
}



