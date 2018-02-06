import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LocationService} from '../../order-form/location.service';
import {ProductService} from '../../order-form/product.service';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';
import {OrderModel} from '../../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderLineModel} from '../../models/order-line.model';
import {UPDATE_ORDER_LINE} from '../../redux/redux.actions';
import {OrderlineService} from '../orderline.service';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit, OnDestroy {
  @Output() locationType: EventEmitter<number> = new EventEmitter<number>();
  @select((s: IAppState) => s.order) order$;
  public locations = [];
  public products = [];
  public orderline: OrderLineModel= new OrderLineModel();
  private subscriptions: Subscription[] = [];
  public locationTypeCode1: string; // set locationType
  public locationTypeCode2: string; // set locationType

  constructor(private locationService: LocationService,
              private productService: ProductService,
              private fb: FormBuilder,
              private ngRedux: NgRedux<IAppState>,
              private orderLineService: OrderlineService) {
  }

  ngOnInit() {
    this.locations = this.locationService.get();
    this.products = this.productService.get();
    const subscription = this.order$.subscribe((order: OrderModel) => this.orderline.order.id = order.id);
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public nextStep() {
    this.orderline.locationType = this.locationTypeCode1 + " " + this.locationTypeCode2;
    this.ngRedux.dispatch({type: UPDATE_ORDER_LINE, orderline: this.orderline})
  }

  locationTypeChanged($event: MatSelectChange) {
    this.locationType.emit($event.value);
  }
}
