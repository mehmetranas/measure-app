import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {StepperService} from './stepper.service';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy{
  @select((s: IAppState) => {return {customer: s.customerForm, order: s.order}}) state$;
  private subscription;
  public state: any = {};
  public locationTypeByProperties: any = {};
  constructor(private ngRedux: NgRedux<IAppState>,
              public stepperService: StepperService,
              private orderlinePropertyService: OrderlinePropertyService) { }

  ngOnInit(){
    this.subscription = this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public getOrderlineProperties(event) {
    this.locationTypeByProperties = this.orderlinePropertyService.getProductOption(event);
  }

  setMechanismStatus() {
    if(!this.locationTypeByProperties.mechanismStatusAndPieceCount) return;
      console.log('it is mechanism status')
  }
}
