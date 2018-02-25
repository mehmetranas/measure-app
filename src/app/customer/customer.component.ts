import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_CUSTOMER, ADD_ORDER, UPDATE_STEP} from '../redux/redux.actions';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {CustomerFormModel} from '../models/customerForm.model';
import {OrderService} from '../order-form/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  @select((s: IAppState) => s.stepper) stepper$;
  public isEdit:boolean;
  @Input() customerForm: CustomerFormModel = new CustomerFormModel();
  @Input() order: OrderModel = new OrderModel();
  private subscription: Subscription = new Subscription();
  public measureDate: Date;


  constructor(private ngRedux: NgRedux<IAppState>,
              private customerService: CustomerService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.isEdit = this.customerForm.customer.id ? false:true;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public updateStep(value) {
    this.addNewCustomerAndInitialOrder();
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }

  public addNewCustomerAndInitialOrder() {

    this.subscription = this.customerService.add(this.customerForm.customer, Number(this.customerForm.isToBeMeasure))
      .subscribe((res: any) => {
        this.customerForm.customer.id = res.customerId;
        this.order = new OrderModel(res.id, res.orderDate,new CustomerModel(res.customerId),Number(this.customerForm.isToBeMeasure));
        this.ngRedux
          .dispatch(
            {type: ADD_CUSTOMER,
              customerForm:
                {customer:
                  this.customerForm.customer,isToBeMeasure:this.customerForm.isToBeMeasure}
            });
        this.ngRedux
          .dispatch({type: ADD_ORDER, order: this.order});
        if(this.customerForm.isToBeMeasure) this.askMeasuredDate();
        },
        err => console.log("err",err));
    this.isEdit = false;
  }

  private askMeasuredDate() {
    this.order.measureDate = this.measureDate;
    this.orderService.update(this.order).subscribe(res => {
            this.ngRedux.dispatch({type:ADD_ORDER,order:this.order})
          });
   }

  public editCustomer(){
    this.isEdit=true;
  }
}
