import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {OrderModel} from '../../models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderLineModel} from '../../models/order-line.model';
import { MatDialog} from '@angular/material';
import {OrderlinePropertyService} from '../orderline-property.service';
import {locations, products} from '../../helpers';
import {OrderlineFormService} from '../orderline-form.service';
import {DynamicMeasureComponent} from '../../dialogs/dynamic-measure/dynamic-measure.component';

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
  @Input() orderlines: any[] = [];
  @ViewChild('measureForm') form;
  private savedOrderlinesOnProduct: number[] = [];
  private orderlineProperties: any = {};
  public selectedOrderlines: OrderLineModel[] = [];
  public locations = locations;
  public products = products;
  private subscriptions: Subscription[] = [];
  public locationTypeCode1 = ''; // set locationType
  public locationTypeCode2 = '';
  public selectedProducts: any[] = [];
  public locationTypeSelected = false;
  public locationName: number;
  public mechanismStatus: number;

  // set locationType

  constructor(private orderlinePropertiesService: OrderlinePropertyService,
              private orderlineFormService: OrderlineFormService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.selectedProducts = [
      {value:0,isSelected:false},
      {value:1,isSelected:false},
      {value:2,isSelected:false},
      {value:3,isSelected:false},
      {value:4,isSelected:false},
      {value:5,isSelected:false},
      {value:6,isSelected:false},
      {value:7,isSelected:false},
      {value:8,isSelected:false},
      {value:9,isSelected:false},
      {value:10,isSelected:false}
    ];
    // this.orderline.order.id = this.order.id;
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

  // public setAndUpdateOrderline() {
  //   this.orderline.locationType = this.locationTypeCode1 + " " + this.locationTypeCode2;
  //   if(!this.orderlineProperties.mechanismStatusAndPieceCount)
  //   {
  //     this.orderline.piecesCount = 0;
  //     this.orderline.mechanismStatus = 0;
  //   }
  //   this.stepper.count++;
  // }

  // public locationTypeChanged($event: MatSelectChange) {
  //   this.orderlineProperties = this.orderlinePropertiesService.getProductOption($event.value);
  //   if(this.orderlineProperties.mechanismStatusAndPieceCount) this.openDialog(this.orderlineProperties.name);
  //   else
  //     this.locationType.emit(this.orderlineProperties)
  // }

  // public openDialog(name){
  //   const dialogRef = this.dialog.open(ChooseMechanismDialogComponent, {
  //     data: name,
  //     disableClose:true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(!result || (result && !result.answer)) this.orderline.product.productValue = null;
  //     else{
  //       Object.assign(this.orderline,result.data);
  //       const updatedOrderlineProperties = Object.assign(this.orderlineProperties, result.dataToOrderlineProperties);
  //       this.locationType.emit(updatedOrderlineProperties);
  //     }
  //   })
  // }

  //select box config to reselect same object
  resetSelectedProduct() {
    // this.orderline.product.productValue=null;
  }

  private reset() {
    this.form.resetForm();
    // this.orderline.locationType=this.locationTypeCode1=this.locationTypeCode2="";
    this.orderlineProperties = {};
    this.locationType.emit({});
    console.log(this.orderlineProperties)
  }

  get selectedUniqueProducts(){
    return this.selectedOrderlines
  .filter((v, i, s) => s.findIndex((or) => {
    return or.product.productValue === v.product.productValue}) === i)
      .sort((a,b) => a.product.productValue-b.product.productValue);
}

  public toggleProduct(isChecked: boolean, value:number) {
    if(!isChecked) {
      this.clearProduct(value);
      return
    }else
      this.addProduct(value);
  }

  public addProduct(value){
    let orderline =new OrderLineModel();
    orderline.product.productValue = value;
    this.selectedOrderlines.push(orderline);
  }

  public removeProduct(value){
    const i = this.selectedOrderlines
      .findIndex((orderline: OrderLineModel) => orderline.product.productValue === value);
    if(i>=0) this.selectedOrderlines.splice(i,1);
    const newIndex = this.selectedOrderlines
      .findIndex((orderline: OrderLineModel) => orderline.product.productValue === value);
    if(newIndex<0) this.selectedProducts[value].isSelected = false;
  }

  private clearProduct(val:number){
    for (let i=this.selectedOrderlines.length - 1; i >=0; i--) {
      if (this.selectedOrderlines[i].product.productValue === val) {
        this.selectedOrderlines.splice(i,1);
      }
    }
    this.selectedProducts[val].isSelected = false;
  }

  public getProductCount(val: number) {
    const products = this.selectedOrderlines
      .filter((or: OrderLineModel) => or.product.productValue === val);
    return products.length;
  }

  public setLocationType(event: any, type: string) {
   if(event.checked) this.locationTypeCode1 = type;
   this.locationTypeSelected = true;
  }

  public clearLocationTypes() {
    this.locationTypeSelected = false;
    this.locationTypeCode1 = this.locationTypeCode2 = "";
  }

  public isStore(orderline): boolean{
    return (orderline.product.productValue === 2 ||
            orderline.product.productValue === 3 ||
            orderline.product.productValue === 10)
  }

  public openMeasureProcessDialog(orderline: OrderLineModel){
    Object.assign(orderline,{
      order:this.order,
      locationName:this.locationName,
      locationType:this.locationTypeCode1+ " " + this.locationTypeCode2,
      mechanismStatus: this.mechanismStatus,
    });
    const dialogRef = this.dialog.open(DynamicMeasureComponent,{
      data:{
        orderline: orderline,
        count:this.getProductCount(orderline.product.productValue)
      },
      autoFocus:true,
      disableClose: true
    });
    dialogRef.beforeClose()
      .subscribe((data: any) => this.deleteFromCart(data.orderlines))
  }

  private deleteFromCart(orderlines: OrderLineModel[]) {
    if(orderlines.length<=0) return;
    this.clearProduct(orderlines[0].product.productValue)
  }
}
