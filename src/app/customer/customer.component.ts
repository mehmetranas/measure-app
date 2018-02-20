import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ADD_CUSTOMER, ADD_ORDER, UPDATE_STEP} from '../redux/redux.actions';
import {CustomerService} from './customer.service';
import {CustomerModel} from '../models/customer.model';
import {OrderModel} from '../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {CustomerFormModel} from '../models/customerForm.model';
import {MatDialog} from '@angular/material';
import {MeasuredDateComponent} from '../dialogs/measured-date/measured-date.component';
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


  constructor(private ngRedux: NgRedux<IAppState>,
              private dialog: MatDialog,
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

    this.subscription = this.customerService.add(this.customerForm.customer, Number(this.customerForm.isToBeMeasured))
      .subscribe((res: any) => {
        this.customerForm.customer.id = res.customerId;
        this.order = new OrderModel(res.id, res.orderDate,new CustomerModel(res.customerId),Number(this.customerForm.isToBeMeasured));
        this.ngRedux
          .dispatch(
            {type: ADD_CUSTOMER,
              customerForm:
                {customer:
                  this.customerForm.customer,isToBeMeasured:this.customerForm.isToBeMeasured}});
        this.ngRedux
          .dispatch({type: ADD_ORDER, order: this.order})},
        err => console.log("err",err));
    this.isEdit = false;
    if(this.customerForm.isToBeMeasured) this.askMeasuredDate();
  }

  private askMeasuredDate() {
    const dialogRef = this.dialog.open(MeasuredDateComponent,{
      disableClose:true
    });
    dialogRef.afterClosed()
      .takeWhile(data => data.measureDate)
      .subscribe(data => {
          this.order.measureDate = data.measureDate;
          this.orderService.postOrder(this.order).subscribe(res => {
            this.ngRedux.dispatch({type:ADD_ORDER,order:this.order})
          });
        }
      )
  }

  public editCustomer(){
    this.isEdit=true;
  }
}
