import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {locations, orderStatus} from '../helpers';
import {MatDialog, MatDialogRef} from '@angular/material';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import {OrderService} from './order.service';
import {InfoDialogComponent} from '../dialogs/info-dialog/info-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';
import {Router} from '@angular/router';
import {OrderModel} from '../models/order.model';
import {OrderLineModel} from '../models/order-line.model';
import {CustomerModel} from '../models/customer.model';
import {OrderlineFormService} from '../order-line-form/orderline-form.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @Output() state: any = {};
  @Output() form: any = {valid:false};
  @Output() stepper = {count:0};
  @Output() order: OrderModel= new OrderModel();
  @Output() customer: CustomerModel = new CustomerModel(null);
  @Output() orderline: OrderLineModel = new OrderLineModel();
  @Output() orderlines: any[] = [];
  public orderlineProperties: any = {};
  public locations = locations;
  private subscription:Subscription = new Subscription();
  constructor(private orderService:OrderService,
              public orderlineformService: OrderlineFormService,
              private route: Router,
              private dialog: MatDialog) { }

  ngOnInit(){
   }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public getOrderlineProperties(orderlineProperties) {
    this.orderlineProperties = orderlineProperties;
  }

  public completeOrder(value:number) {
    let dialogRef: MatDialogRef<any>;
    let statusValue = value;
    let isToBeMeasureDisplay = false;
    if (this.order.orderStatus === orderStatus['Ölçüye Gidilecek'].value)
      isToBeMeasureDisplay = true;
    if (statusValue === orderStatus['Sipariş Kaydı Alındı'].value
      || statusValue === orderStatus['Sipariş İşleme Konuldu'].value)
    {
      console.log(this.order)
      dialogRef = this.dialog
        .open(OrderFinalProcessComponent, {data: this.order.totalAmount});
    }
    else if (statusValue == orderStatus['Eksik Sipariş'].value)
      dialogRef = this.dialog.open(InfoDialogComponent, {
        data: {statusValue: statusValue, isToBeMeasureDisplay: isToBeMeasureDisplay},
        maxWidth: 350
      });
    if (dialogRef) {
      dialogRef.afterClosed()
        .takeWhile(data => data.order)
        .subscribe(data => {
          if (data) {
            if (!data.answer) return;
            else this.postOrder(data.order);
          }
        });
    }
  }

  private postOrder(order) {
    Object.assign(this.order, order);
    const orderClone = {...this.order};
    this.orderService.update(orderClone as OrderModel)
      .subscribe(response => {
        this.route.navigate(['orders']);
      });
  }
}



