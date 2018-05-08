import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import {LazyLoadEvent} from 'primeng/api';
import {orderStatus, setTailorOrderlineCount} from '../helpers';
import 'rxjs/add/operator/take';
import {CustomerModel} from '../models/customer.model';
import {MatDialog} from '@angular/material';
import {UpdateOrderComponent} from '../dialogs/update-order/update-order.component';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/finally';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog.component';
import {OrderLineModel} from '../models/order-line.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit,AfterViewInit {
  @Input() customerId: number;
  @Input() isTailor = false;
  @Input() orderlines: OrderLineModel[];
  @Input() paymentIconDisplay = true;
  @Input() orders: OrderModel[];
  @Input() singleOrder: OrderModel;
  @Input() isLazyLoad = true;
  @Input() singleRow = false;
  @Input() displayCustomer = true;
  public visible = true; // a trick to reload data table
  public totalRecords: number;
  public orderStatus: any;
  public selectedOrder: OrderModel;
  public order = new OrderModel();
  public orderStatusList: any[];
  private newOrder: boolean;
  public cols: any[];
  public isPending = false;
  public ordersInProcess: OrderModel[] = [];
  public paymentsDisplay = false;
  public filterValue: number = null;

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef,
              private dialog: MatDialog) { }

  ngOnInit() {console.log("isTailor",this.isTailor)
    this.orderStatus = orderStatus;
    if(!this.orders && this.singleOrder){
      this.orders = [];
      this.orders.push(this.singleOrder)
    }
    this.order.customer = new CustomerModel(null);
    if (this.orders) { this.totalRecords = this.orders.length; }
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  private reloadTable() {
    this.visible = false;
    setTimeout(() => {
      this.visible = true;
      this.changeDetector.detectChanges();
    }, 0);
  }

  public loadOrdersLazy(event: LazyLoadEvent) {
    this.isPending = true;
    if (this.filterValue !== null) {
      this.orderService.orderFilter(this.filterValue, event)
        .take(1)
        .finally(() => {
          this.isPending = false;
        })
        .subscribe((response) => this.setOrdersAndTotalRecords(response));
    } else {
      this.orderService.getOrders(event)
        .take(1)
        .finally(() => this.isPending = false)
        .subscribe((response: any) => {
            this.setOrdersAndTotalRecords(response);
          });
    }
  }

  public filterOrders(value) {
    this.filterValue = value;
    this.reloadTable();
  }

  private save(order) {
    this.isPending = true;
    this.orderService.update(order)
      .finally(() => this.isPending = false)
      .subscribe((res) => {
        const orders = [...this.orders];
        if (this.newOrder) {
          orders.push(this.order);
        } else {
          orders[this.findSelectedOrderIndex()] = order;
        }
        this.orders = orders;
        this.orderService.ordersUpdated.emit(orders);
        this.order = null;
      });
  }

  public delete(id: number) {
    this.isPending = true;
    this.orderService.deleteById(id)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        const index = this.orders.findIndex((o) => o.id === id);
        if (index > -1) { this.orders.splice(index, 1); }
        this.totalRecords--;
        if (this.orders.length <= 0 ) {
         this.reloadTable();
        }
      });
  }

  public goDetail(id: number) {
    if (!id) { return; }
    if (!this.isTailor) {
      this.router.navigate(['/user/order', id]);
    } else {
      this.router.navigate(['/tailor/order', id]);
    }

  }

  private findSelectedOrderIndex() {
    return this.orders.indexOf(this.selectedOrder);
  }

  public edit(order: any) {
    this.newOrder = false;
    order.tailorOrderLineCount = this.singleRow
      ? setTailorOrderlineCount(this.orderlines)
      : order.tailorOrderLineCount; //set this value if orderline deleted
    this.selectedOrder = order;
    this.order = {...order, customer: {...order.customer, tenant: {...order.customer.tenant}}};
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      data: {order: this.order, isProcess: false},
      width: '250',
      disableClose: true});
    dialogRef.afterClosed().subscribe((data: any) => {
      if (!data || !data.answer) { return; }
      this.save(data.order);
    });
  }

  public deleteProcessConfirmation(orderId?: number) {
    const message = orderId ?
      'Bu siparişi silmek istediğinizden emin misiniz?' :
      'Seçtiğiniz tüm siparişler silinecek. Devam etmek istiyor musunuz?' ;
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data:
          {message: message},
        width: '250'});
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data: any) => {
        if (!data) { return; }
      if (data.answer) {
        if (orderId) { this.delete(orderId); } else { this.deleteOrderList(); }
      }
    });
  }

  public deleteOrderList() {
    if (this.ordersInProcess.length <= 0) { return; }
    this.isPending = true;
    const orderIds = [];
    this.ordersInProcess.forEach((order, index) => {
      orderIds.push(order.id);
    });
    this.orderService.deleteByList(orderIds)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        this.ordersInProcess.forEach((order: OrderModel) => {
          const index = this.orders.findIndex((o) => o.id === order.id);
          if (index > -1) { this.orders.splice(index, 1); }
          this.totalRecords--;
        });
          if (this.orders.length <= 0 ) {
            this.reloadTable();
          }
          this.ordersInProcess = [];
      });
  }

  public addOrderline(order: OrderModel) {
    if (order.orderStatus === 4 || order.orderStatus === 5) { return; }
    if (order.id) {
      this.router.navigate(['user/order-form', order.id]);
    }
  }

  public changeOrderStatus(event, order: OrderModel) {console.log("tailor order",order)
    if (event.checked === true) {
      this.isPending = true;
      order.orderStatus = 4;
      this.orderService.update(order)
        .finally(() => this.isPending = false)
        .take(1)
        .subscribe(() => {},
          (err) => {order.orderStatus = 3; });
    } else {
      this.isPending = true;
      order.orderStatus = 3;
      this.orderService.update(order)
        .finally(() => this.isPending = false)
        .take(1)
        .subscribe(() => {},
          (err) => {order.orderStatus = 4; });
    }
  }

  private setOrdersAndTotalRecords(response) {
    const orders = response.orderDetailPage.content;
    if (this.isTailor) {
      this.orders = orders.filter((order: OrderModel) => order.tailorOrderLineCount > 0);
    } else {
      this.orders = orders;
    }

      this.totalRecords = response.orderDetailPage.totalElements;
  }
}
