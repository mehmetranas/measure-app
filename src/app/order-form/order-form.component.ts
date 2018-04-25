import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {OrderService} from './order.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderModel} from '../models/order.model';
import {CustomerModel} from '../models/customer.model';
import {UpdateOrderComponent} from '../dialogs/update-order/update-order.component';
import {setTailorOrderlineCount} from "../helpers";

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

  public completeOrder() {
    // this.order.tailorOrderLineCount = setTailorOrderlineCount(this.orderlines);
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      data:{
        order:this.order,
        isProcess:true,
      },
      maxWidth:350
    });
      dialogRef.afterClosed()
        .take(1)
        .subscribe(data => {
          if(!data || !data.order) return;
            this.postOrder(data.order)
        });
  }

  private postOrder(order) {
    Object.assign(this.order, order);
    const orderClone = {...this.order};
    this.orderService.update(orderClone as OrderModel)
      .subscribe(response => {
        this.router.navigate(['/user/orders']);
      });
  }

  private setOrder() {
    this.isPending=true;
    this.orderService.getOrder(this.orderId)
      .finally(() => this.isPending = false)
      .take(1)
      .subscribe((response: any) => {
        if(response.order){
          if(response.order.orderStatus === 4 || response.order.orderStatus === 5) {
            this.router.navigateByUrl("/user/orders");
            this.snackBar.open("Durumu bitirilmiş görünen ürüne ölçü ekleyemezsiniz.",null,{
              duration:4000,
              verticalPosition:'top'
            });
            return;
          }
            this.order = response.order;
            this.orderlines = response.orderLineDetailList || [];
            this.customer = response.order.customer;
          }
        },
        (err:any) => {
          if(err instanceof Error){
            this.snackBar.open("Sipariş bulunamadı");
            this.router.navigate(["/user/orders"]);
          }
        })
  }
}



