import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {
  ADD_ORDER, RESET_CUSTOMER, RESET_ORDER, RESET_ORDER_LINE, RESET_ORDER_LINE_PROPERTIES, RESET_ORDER_LINES, SET_PANEL_STATE,
  SET_STEP
} from '../redux/redux.actions';
import {locations, orderStatus} from '../helpers';
import {MatDialog, MatDialogRef} from '@angular/material';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import {OrderService} from './order.service';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  providers: [
    ConfirmationService
  ]
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((state: IAppState) => state.orderlines) orderlines$;
  @select((s: IAppState) =>
  {return {
    customerForm: s.customerForm,
    order: s.order,
    stepper: s.stepper,
    orderlineInProcess: s.orderlineInProcess}}) state$;
  public locations = locations;
  public state: any = {};
  public orderlineProperties: any = {};
  private subscription:Subscription = new Subscription();
  constructor(private orderService:OrderService,
              private ngRedux: NgRedux<IAppState>,
              private route: Router,
              private dialog: MatDialog,
              private confirmDialog: ConfirmationService) { }

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
    let dialogRef: MatDialogRef<any>;
    let statusObj =orderStatus[Object.keys(orderStatus)[status]];
    if(this.state.order.orderStatus == orderStatus['Ölçüye Gidilecek'].value){
      this.askIsMeasuredComplete()
        .subscribe(result => {
          if(!result) {
            statusObj = orderStatus['Ölçüye Gidilecek'];
          }});
    }
    if(statusObj==orderStatus['Sipariş Kaydı Alındı'])
      dialogRef = this.dialog.open(OrderFinalProcessComponent,{data:this.state.order.totalAmount});
    else if(statusObj==orderStatus['Eksik Sipariş'])
      dialogRef = this.dialog.open(InfoDialogComponent,{data:{status:statusObj},maxWidth:350});
    else if(statusObj==orderStatus['Ölçüye Gidilecek'])
      this.postOrder(this.state.order);
    if(dialogRef){
      dialogRef.afterClosed()
        .takeWhile(data => data.order)
        .subscribe(data => {
          if(data){
            if(!data.answer) return;
            else this.postOrder(data.order);
          }
        });
    }
  }

  private postOrder(order) {
    Object.assign(this.state.order, order);
    const orderClone = {...this.state.order};
    this.orderService.postOrder(orderClone)
      .subscribe(response => {
        console.log(response);
        this.clearOrderState();
        this.route.navigate(['orders']);
      });
  }

  private askIsMeasuredComplete() {
    let isMeasured = false;
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:
        {message:"Bu sipariş için ölçü alma işlemi istenmiş. Ölçü alma işlemini tamamladınız mı?"}});
    return dialogRef.afterClosed()
      .takeWhile(data => data.answer);
  }

  private clearOrderState() {
    this.ngRedux.dispatch({type:RESET_CUSTOMER, customer:null});
    this.ngRedux.dispatch({type:RESET_ORDER, order:null});
    this.ngRedux.dispatch({type:RESET_ORDER_LINE, orderline:null});
    this.ngRedux.dispatch({type:RESET_ORDER_LINES, orderlines:null});
    this.ngRedux.dispatch({type:RESET_ORDER_LINE_PROPERTIES, orderlineProperties:null});
  }
}



