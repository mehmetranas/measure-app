import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../order-form/order.service';
import {orderStatus} from '../helpers';

@Component({
  selector: 'app-customer',
  template: `
    <div class="container">
      <div class="row">
        <ng-container *ngIf="formDisplay; else viewCustomer">
          <div class="col-md-12">
            <app-customer-form
              [customer]="customer"
              (customerFormEmit)="addNewCustomerAndInitialOrderOrUpdate($event)"></app-customer-form>
          </div>
        </ng-container>
        <ng-template #viewCustomer>
          <div class="col-md-12">
            <app-view-customer
              (editCustomer)="editCustomer($event)"
              [customer]="customer"></app-view-customer>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [``]
})
export class CustomerComponent implements OnInit, OnDestroy {
  @Input() order: OrderModel;
  @Input() stepper:any={};
  @Input() customer: CustomerModel;
  public formDisplay:boolean=false;
  public measureDate: Date;
  private subscription: Subscription = new Subscription();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.formDisplay = !this.customer.id ? true : false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public addNewCustomerAndInitialOrderOrUpdate(customer: CustomerModel) {

    this.subscription = this.customerService.add(customer,null)
      .subscribe((res: any) => {
          Object.assign(this.customer,customer,{id:res.id});
          this.order.id = res.id;
          this.order.orderDate = res.orderDate;
          this.order.customer = customer;
          this.stepper.count++;
          this.formDisplay= false;
        },
          err => console.log("err",err));
  }
  public editCustomer(customer){
    this.formDisplay = true;
    Object.assign(this.customer,customer);
  }
}
