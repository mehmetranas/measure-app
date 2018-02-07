import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {StepperService} from './stepper.service';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';
import { MatDialog} from '@angular/material';
import {SET_STEP} from '../redux/redux.actions';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((s: IAppState) => {return {customer: s.customerForm, order: s.order, stepper: s.stepper}}) state$;
  private subscription;
  public state: any = {};
  public orderLineProperties: any = {};
  constructor(private ngRedux: NgRedux<IAppState>,
              public stepperService: StepperService,
              private orderlinePropertyService: OrderlinePropertyService,
              public dialog: MatDialog) { }

  ngOnInit(){
    this.subscription = this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public getOrderlineProperties(orderLineProperties) {
    this.orderLineProperties = orderLineProperties;
  }

  public setStep(value) {
    this.ngRedux.dispatch({type: SET_STEP, value: value})
  }
}



