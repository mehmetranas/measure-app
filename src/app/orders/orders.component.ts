import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import {LazyLoadEvent} from 'primeng/api';
import { orderStatusNameValue} from '../helpers';
import 'rxjs/add/operator/take';
import {CustomerModel} from '../models/customer.model';
import {MatDialog} from '@angular/material';
import {UpdateOrderComponent} from '../dialogs/update-order/update-order.component';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders:OrderModel[];
  public totalRecords:number;
  public orderStatus = orderStatusNameValue;
  public selectedOrder: OrderModel;
  public order = new OrderModel();
  private newOrder: boolean;
  public loading: true;
  public cols: any[];

  constructor(private orderService: OrderService,
              private router:Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.order.customer = new CustomerModel(null);
    this.cols = [
      {field:"customer.nameSurname", header:"Müşteri İsmi"},
      {field:"customer.mobilePhone", header:"Müşteri Tel"},
      {field:"userUsername", header:"Ölçü Alan"},
      {field:"orderStatus", header:"Durum"},
      {field:"id", header:"Sipariş No"},
      {field:"orderDate", header:"Sipariş Tarihi"},
      {field:"deliveryDate", header:"Teslim Tarihi"},
      {field:"measureDate", header:"Ölçü Alma Tarihi"},
      {field:"mountDate", header:"Montaj Tarihi"},
      {field:"totalAmount", header:"Toplam"},
      {field:"", header:"İşlemler"},
    ]
  }

  public loadOrdersLazy(event: LazyLoadEvent) {
    this.orderService.getOrders(event)
      .subscribe((response:any) => {
      this.orders = response.orderDetailPage.content;
      this.totalRecords = response.orderDetailPage.totalElements;
    });
  }

  private save(order){
    this.orderService.update(order)
      .subscribe((res) => {
        let orders = [...this.orders];
        if(this.newOrder)
          orders.push(this.order);
        else
          orders[this.findSelectedCarIndex()] = order;
        this.orders = orders;
        this.order = null;
      });
  }

  public delete(){
    let index = this.findSelectedCarIndex();
    this.orders = this.orders.filter((val,i) => i!=index);
    this.order = null;
  }

  public onRowSelect(event){
    console.log(event)
    this.router.navigate(["order",event.data.id])
  }

  private findSelectedCarIndex() {
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

  fix(event){
    console.log("fix: ",event)
  }
}
