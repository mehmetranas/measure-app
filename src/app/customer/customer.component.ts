import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../order-form/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  @Input() order: OrderModel;
  @Input() stepper:any={};
  @Input() customer: CustomerModel;
  public isEdit:boolean;
  public isToBeMeasure:boolean = false;
  public measureDate: Date;
  private subscription: Subscription = new Subscription();

  constructor(private customerService: CustomerService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.isEdit = !this.customer.id;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public addNewCustomerAndInitialOrder() {

    this.subscription = this.customerService.addForDevMode(this.customer, Number(this.isToBeMeasure))
      .subscribe((res: any) => {
          this.customer.id = res.customerId;
          this.order.id = res.id;
          this.order.orderDate = res.orderDate;
          this.order.customer = this.customer;
          this.order.orderStatus = Number(this.isToBeMeasure);
          if(this.isToBeMeasure) this.updateOrder();
        },
          err => console.log("err",err));
    this.isEdit = false;
    this.stepper.count++;
  }

  private updateOrder() {
    this.order.measureDate = this.measureDate;
   }

  public editCustomer(){
    this.isEdit=true;
  }
}
