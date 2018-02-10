import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {SET_PANEL_STATE, SET_STEP} from '../redux/redux.actions';
import {LocationService} from './location.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((s: IAppState) =>
  {return {
    customer: s.customerForm,
    order: s.order,
    stepper: s.stepper,
    orderlineInProcess: s.orderlineInProcess}}) state$;
  private subscription;
  public state: any = {};
  public orderlineProperties: any = {};
  constructor(private ngRedux: NgRedux<IAppState>, public locationService: LocationService) { }

  ngOnInit(){
    this.subscription = this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public getOrderlineProperties(orderlineProperties) {
    this.orderlineProperties = orderlineProperties;
  }

  public setStep(value) {
    this.ngRedux.dispatch({type: SET_STEP, value: value})
  }

  public setMeasurePanelStateToClosed(){
    this.ngRedux.dispatch({type: SET_PANEL_STATE, statusOfClosed:{
        panelMeasure: true
      }})
  }
}



