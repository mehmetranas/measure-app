import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_CUSTOMER, ADD_ORDER, UPDATE_STEP} from '../redux/redux.actions';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {OrderService} from '../order-form/order.service';
import {Subscription} from 'rxjs/Subscription';
import {StepperService} from '../order-form/stepper.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  @Output() customerAdded = new EventEmitter<boolean>(); // to hide component after customer created successfully; It should remove after add nextStep property
  @select((s: IAppState) => s.stepper) stepper$;
  public isEdit = true;
  public customer: CustomerModel = new CustomerModel();
  public order: OrderModel = new OrderModel();
  private subscription: Subscription = new Subscription();

  constructor(private ngRedux: NgRedux<IAppState>,
              private customerService: CustomerService,
              private stepperService: StepperService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public updateStep(value) {
    this.addNewCustomerAndInitialOrder();
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }

  public addNewCustomerAndInitialOrder() {

    this.subscription = this.customerService.addForDevMode(this.customer)
      .subscribe((res: any) => {
        console.log(res)
        this.customer.id = res.customerId;
        let order = new OrderModel(res.orderId, res.orderDate);
        this.ngRedux.dispatch({type: ADD_CUSTOMER, customer: this.customer});
        this.ngRedux.dispatch({type: ADD_ORDER, order: order });
        },
        err => console.log(err));

    this.isEdit = false;
  }

  public editCustomer() {
  }
}
