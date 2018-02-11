import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LocationService} from '../../order-form/location.service';
import {ProductService} from '../../order-form/product.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';
import {OrderDetailModel} from '../../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderLineModel} from '../../models/order-line.model';
import {UPDATE_ORDER_LINE, UPDATE_ORDER_LINE_FORM, UPDATE_STEP} from '../../redux/redux.actions';
import { MatDialog, MatSelectChange} from '@angular/material';
import {OrderlinePropertyService} from '../orderline-property.service';
import {IPanelsState} from '../../redux/stores/panels.store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit, OnDestroy {
  @Output() locationType: EventEmitter<any> = new EventEmitter<any>();
  @select((s: IAppState) => s.order) order$;
  @select((s: IAppState) => s.panels) panels$;
  public locations = [];
  public products = [];
  public orderline: OrderLineModel= new OrderLineModel();
  private subscriptions: Subscription[] = [];
  public locationTypeCode1 = ''; // set locationType
  public locationTypeCode2 = ''; // set locationType
  private orderlineProperties: any = {};
  public measureForm: FormGroup;

  constructor(private locationService: LocationService,
              private productService: ProductService,
              private fb: FormBuilder,
              private ngRedux: NgRedux<IAppState>,
              private orderlinePropertiesService: OrderlinePropertyService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.measureForm = this.fb.group({
      location:[null,Validators.required],
      product:[null,Validators.required],
      windowOrDoor:[null,Validators.required],
      productNo:[null,Validators.required]
    });

    this.locations = this.locationService.get();
    this.products = this.productService.get();
    const subscriptionOrder = this.order$.subscribe((order: OrderDetailModel) => this.orderline.order.id = order.id);
    this.subscriptions.push(subscriptionOrder);
    const subscriptionPanels = this.panels$.subscribe((panel: IPanelsState) => {
      if(panel.statusOfClosed.panelMeasure) this.updateOrderline();
    });
    this.subscriptions.push(subscriptionPanels);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private updateOrderline() {
    this.ngRedux.dispatch({type:UPDATE_ORDER_LINE, orderline:this.orderline});
    this.ngRedux.dispatch({
      type: UPDATE_ORDER_LINE_FORM,
      form: {isValid: this.measureForm.valid}
    });
  }

  public updateStep(value) {
    this.setAndUpdateOrderline();
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }

  private setAndUpdateOrderline() {
    this.orderline.locationType = this.locationTypeCode1 + " " + this.locationTypeCode2;
    if(!this.orderlineProperties.mechanismStatusAndPieceCount)
    {
      this.orderline.piecesCount = 0;
      this.orderline.mechanismStatus = 0;
    }
  }

  locationTypeChanged($event: MatSelectChange) {
    this.orderlineProperties = this.orderlinePropertiesService.getProductOption($event.value);
    if(this.orderlineProperties.mechanismStatusAndPieceCount) this.openDialog(this.orderlineProperties.name);
    else
    this.locationType.emit(this.orderlineProperties)
  }

  public openDialog(name){
    const dialogRef = this.dialog.open(ChooseMechanismDialogComponent, {
      data: name
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result || (result && !result.answer)) this.orderline.productDetailModel.productValue = null;
      else{
        Object.assign(this.orderline,result.data);
        const updatedOrderlineProperties = Object.assign(this.orderlineProperties, result.dataToOrderlineProperties);
        this.locationType.emit(updatedOrderlineProperties);
      }
    })
  }

  resetSelectedProduct() {
    this.orderline.productDetailModel.productValue=null;
  }
}
