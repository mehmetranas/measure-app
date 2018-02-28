import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {OrderModel} from '../../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderLineModel} from '../../models/order-line.model';
import { MatDialog, MatSelectChange} from '@angular/material';
import {OrderlinePropertyService} from '../orderline-property.service';
import {ChooseMechanismDialogComponent} from '../../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {locations, products} from '../../helpers';
import {OrderlineFormService} from '../orderline-form.service';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit, OnDestroy {
  @Output() locationType: EventEmitter<any> = new EventEmitter<any>();
  @Input() stepper:any={};
  @Input() globalForm:any;
  @Input() order: OrderModel;
  @Input() orderline: OrderLineModel;
  @ViewChild('measureForm') form;
  private orderlineProperties: any = {};
  public locations = locations;
  public products = products;
  private subscriptions: Subscription[] = [];
  public locationTypeCode1 = ''; // set locationType
  public locationTypeCode2 = ''; // set locationType

  constructor(private orderlinePropertiesService: OrderlinePropertyService,
              private orderlineFormService: OrderlineFormService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.orderline.order.id = this.order.id;
    this.orderlineFormService.orderlineFormState
      .subscribe((result: any) => {
        if(result.measureFormClosed) this.globalForm.valid = this.form.valid;
        if(result.orderlineFormPosted) {
          this.reset();
        }
      })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public setAndUpdateOrderline() {
    this.orderline.locationType = this.locationTypeCode1 + " " + this.locationTypeCode2;
    if(!this.orderlineProperties.mechanismStatusAndPieceCount)
    {
      this.orderline.piecesCount = 0;
      this.orderline.mechanismStatus = 0;
    }
    this.stepper.count++;
  }

  public locationTypeChanged($event: MatSelectChange) {
    this.orderlineProperties = this.orderlinePropertiesService.getProductOption($event.value);
    if(this.orderlineProperties.mechanismStatusAndPieceCount) this.openDialog(this.orderlineProperties.name);
    else
      this.locationType.emit(this.orderlineProperties)
  }

  public openDialog(name){
    const dialogRef = this.dialog.open(ChooseMechanismDialogComponent, {
      data: name,
      disableClose:true
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

  //select box config to reselect same object
  resetSelectedProduct() {
    this.orderline.product.productValue=null;
  }

  private reset() {
    this.form.resetForm();
    this.orderline.locationType=this.locationTypeCode1=this.locationTypeCode2="";
    this.orderlineProperties = {};
    this.locationType.emit({});
    console.log(this.orderlineProperties)
  }
}
