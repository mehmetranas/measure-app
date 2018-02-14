import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {LocationService} from '../../order-form/location.service';
import {ProductService} from '../../order-form/product.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';
import {OrderModel} from '../../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderLineModel} from '../../models/order-line.model';
import {UPDATE_ORDER_LINE, UPDATE_ORDER_LINE_FORM, UPDATE_STEP} from '../../redux/redux.actions';
import { MatDialog, MatSelectChange} from '@angular/material';
import {OrderlinePropertyService} from '../orderline-property.service';
import {IPanelsState} from '../../redux/stores/panels.store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {IOrderlineFormState} from '../../redux/stores/orderlineForm.state';
import {tassign} from 'tassign';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit, OnDestroy {
  @Output() locationType: EventEmitter<any> = new EventEmitter<any>();
  @select((s: IAppState) => s.order) order$;
  @select((s: IAppState) => s.panels) panels$;
  @select((s: IAppState) => s.orderlineForm) form$;
  @select((s: IAppState) => s.orderlineInProcess) orderline$;
  @ViewChild('measureForm') form;
  public locations = [];
  public products = [];
  public orderline: OrderLineModel= new OrderLineModel();
  private subscriptions: Subscription[] = [];
  public locationTypeCode1 = ''; // set locationType
  public locationTypeCode2 = ''; // set locationType
  private orderlineProperties: any = {};

  constructor(private locationService: LocationService,
              private productService: ProductService,
              private ngRedux: NgRedux<IAppState>,
              private orderlinePropertiesService: OrderlinePropertyService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.locations = this.locationService.get();
    this.products = this.productService.get();
    const subscOrderline = this.orderline$.subscribe((orderline: OrderLineModel) => this.orderline=orderline);
    this.subscriptions.push(subscOrderline);
    const subscOrder = this.order$.subscribe((order: OrderModel) => this.orderline.order.id = order.id);
    this.subscriptions.push(subscOrder);
    const subscPanels = this.panels$.subscribe((panel: IPanelsState) => {
      if(panel.statusOfClosed.panelMeasure) this.updateOrderline();
    });
    this.subscriptions.push(subscPanels);
    const subscForm = this.form$.subscribe((form: IOrderlineFormState) => {
      if(form.isSubmit) this.resetOrderlineForm();
    });
    this.subscriptions.push(subscForm);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private updateOrderline() {
    this.ngRedux.dispatch({type:UPDATE_ORDER_LINE, orderline:this.orderline});
    this.ngRedux.dispatch({
      type: UPDATE_ORDER_LINE_FORM,
      form: {isValid: this.form.valid}
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

  public locationTypeChanged($event: MatSelectChange) {
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
      if(!result || (result && !result.answer)) this.orderline.product.productValue = null;
      else{
        Object.assign(this.orderline,result.data);
        const updatedOrderlineProperties = Object.assign(this.orderlineProperties, result.dataToOrderlineProperties);
        this.locationType.emit(updatedOrderlineProperties);
      }
    })
  }

  resetSelectedProduct() {
    this.orderline.product.productValue=null;
  }

  resetOrderlineForm(){
    this.form.resetForm();
    this.orderline.locationType=this.locationTypeCode1=this.locationTypeCode2="";
  }
}
