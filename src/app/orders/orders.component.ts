import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import {LazyLoadEvent} from 'primeng/api';
import { orderStatusNameValue} from '../helpers';
import 'rxjs/add/operator/take';
import {CustomerModel} from '../models/customer.model';
import {MatDialog} from '@angular/material';
import {UpdateOrderComponent} from '../dialogs/update-order/update-order.component';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import 'rxjs/add/operator/finally';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Input() customerId: number;
  public orders:OrderModel[]=[];
  public totalRecords:number;
  public orderStatus = orderStatusNameValue;
  public selectedOrder: OrderModel;
  public order = new OrderModel();
  private newOrder: boolean;
  public cols: any[];
  public isPending = false;
  public ordersInProcess: OrderModel[] = [];

  constructor(private orderService: OrderService,
              private router:Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    if(this.customerId) {
      this.isPending = true;
      this.orderService.getOrdersByCustomerId(this.customerId)
        .finally(() => this.isPending = false)
        .subscribe((response:any) => {
            this.orders = response.orders;
          },
          (err:any) => {
            if(err.error && err.error.connection)
              console.log("Bağlantı hatası lütfen sayfayı yenileyip tekrar deneyin")
          });
    }
    this.order.customer = new CustomerModel(null);
    this.cols = [
      {field:"customer.nameSurname", header:"Müşteri İsmi"},
      {field:"customer.mobilPhone", header:"Müşteri Tel"},
      {field:"userUsername", header:"Ölçü Alan"},
      {field:"orderStatus", header:"Durum"},
      {field:"id", header:"Sipariş No"},
      {field:"orderDate", header:"Sipariş Tarihi"},
      {field:"deliveryDate", header:"Teslim Tarihi"},
      {field:"measureDate", header:"Ölçü Alma Tarihi"},
      {field:"mountDate", header:"Montaj Tarihi"},
      {field:"totalAmount", header:"Toplam"},
      {field:"depositeAmount", header:"Ödenen"},
      {field:"", header:"Kalan"},
    ];
    if(this.customerId){
      this.cols.splice(0,2);
    }
  }

  private reloadComponent(){
    this.router.navigateByUrl('dashboard/order-form', {skipLocationChange:true})
      .then(() =>  this.router.navigate(["dashboard/orders"]))
  }

  public loadOrdersLazy(event: LazyLoadEvent) {
    this.isPending = true;
    this.orderService.getOrders(event)
      .finally(() => this.isPending = false)
      .subscribe((response:any) => {
      this.orders = response.orderDetailPage.content;
      this.totalRecords = response.orderDetailPage.totalElements;
    },
        (err:any) => {
        if(err.error && err.error.connection)
          console.log("Bağlantı hatası lütfen sayfayı yenileyip tekrar deneyin")
        });
  }

  private save(order){
    this.orderService.update(order)
      .subscribe((res) => {
        let orders = [...this.orders];
        if(this.newOrder)
          orders.push(this.order);
        else
          orders[this.findSelectedOrderIndex()] = order;
        this.orders = orders;
        this.order = null;
      });
  }

  public delete(id: number){
    this.isPending = true;
    this.orderService.deleteById(id)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        const index = this.orders.findIndex((o) => o.id === id);
        if(index > -1) this.orders.splice(index,1);
        this.totalRecords--;
        if(this.orders.length <=0 ) {
         this.reloadComponent();
        }
      });
  }

  public goDetail(order){
    this.router.navigate(["dashboard/order",order.id])
  }

  private findSelectedOrderIndex() {
    return this.orders.indexOf(this.selectedOrder);
  }

  public edit(order) {
    this.newOrder = false;
    this.selectedOrder = order;
    this.order = {...order,customer:{...order.customer, tenant:{...order.customer.tenant}}};
    const dialogRef = this.dialog.open(UpdateOrderComponent,{
      data:this.order,
      width:'250',
      disableClose:true});
    dialogRef.afterClosed().subscribe((data:any) =>{
      if(!data.answer) return;
      this.save(data.order)
    })
  }

  public deleteProcessConfirmation(orderId?: number){
    const message = orderId ?
      "Bu siparişi silmek istediğinizden emin misiniz?":
      "Seçtiğiniz tüm siparişler silinecek. Devam etmek istiyor musunuz?" ;
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data:
          {message: message},
        width:"250"});
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data:any) => {
        if(!data) return;
      if(data.answer) {
        if(orderId) this.delete(orderId);
        else this.deleteOrderList();
      }
    });
  }

  public deleteOrderList() {
    if(this.ordersInProcess.length<=0) return;
    this.isPending = true;
    let orderIds = [];
    this.ordersInProcess.forEach((order,index) => {
      orderIds.push(order.id)
    });
    this.orderService.deleteByList(orderIds)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        this.ordersInProcess.forEach((order: OrderModel) => {
          const index = this.orders.findIndex((o) => o.id === order.id);
          if(index>-1) this.orders.splice(index,1);
          this.totalRecords--;
        });
          if(this.orders.length <=0 ) {
            this.reloadComponent();
          }
          this.ordersInProcess=[];
      });
  }

  public addOrderline(orderId) {
    if(orderId)
      this.router.navigate(["dashboard/order-form",orderId]);
  }
}
