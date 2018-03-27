import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {orderStatus} from '../helpers';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import {OrderService} from './order.service';
import {InfoDialogComponent} from '../dialogs/info-dialog.component';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderModel} from '../models/order.model';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @Output() state: any = {};
  @Output() stepper = {count:0};
  @Output() order: OrderModel= new OrderModel();
  @Output() customer: CustomerModel = new CustomerModel(null);
  @Output() orderlines: any[] = [];
  private orderId: number;
  public orderlineProperties: any = {};
  public statusList = [];
  public statusSelected;
  private subscription:Subscription = new Subscription();
  public isPending: boolean = false;
  constructor(private orderService:OrderService,
              private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar,
              private activeRoute: ActivatedRoute)  {}

  ngOnInit(){
    this.statusList = [
      {value:6, viewValue:"Teklif Olarak Kaydet"},
      {value:1, viewValue:"Ölçüye Gidilecek"},
      {value:0, viewValue:"Siparişi Kaydet"},
      {value:2, viewValue:"Siparişi Oluştur"},
      {value:3, viewValue:"Terziye Gönder"}
    ];
    this.subscription = this.activeRoute.params
      .subscribe((params) => {
        this.orderId = +params["id"];
        if(!this.orderId) return;
        this.setOrder();
      });
   }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public completeOrder(statusValue: number) {
    let dialogRef: MatDialogRef<any>;
    if (statusValue === orderStatus['Sipariş Kaydı Alındı'].value
      || statusValue === orderStatus['Sipariş İşleme Konuldu'].value
      || statusValue === orderStatus['Ölçüye Gidilecek'].value)
      dialogRef = this.dialog
        .open(OrderFinalProcessComponent, {
          data:
          {totalAmount:this.order.totalAmount, orderStatus:statusValue} || {}});
    else if (statusValue === orderStatus['Eksik Sipariş'].value)
      dialogRef = this.dialog.open(InfoDialogComponent, {
        data: {statusValue: statusValue},
        maxWidth: 350
      });
    else if(statusValue === orderStatus['Teklif'].value){
      this.order.orderStatus = statusValue;
      this.postOrder(this.order);
    }
    if (dialogRef) {
      dialogRef.afterClosed()
        .take(1)
        .subscribe(data => {
          if(data.order)
            this.postOrder(data.order)
        });
    }
  }

  private postOrder(order) {
    Object.assign(this.order, order);
    const orderClone = {...this.order};
    this.orderService.update(orderClone as OrderModel)
      .subscribe(response => {
        this.router.navigate(['/dashboard/orders']);
      });
  }

  private setOrder() {
    this.isPending=true;
    this.orderService.getOrder(this.orderId)
      .finally(() => this.isPending = false)
      .take(1)
      .subscribe((response: any) => {
        if(response.order){
            this.order = response.order;
            this.orderlines = response.orderLineDetailList || [];
            this.customer = response.order.customer;
          }
        },
        (err:any) => {
          if(err instanceof Error){
            this.snackBar.open("Sipariş bulunamadı");
            this.router.navigate(["/dashboard/orders"]);
          }
        })
  }
}



