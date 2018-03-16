import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderModel} from '../../models/order.model';
import {OrderLineModel} from '../../models/order-line.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {locations, products} from '../../helpers';
import {DynamicMeasureComponent} from '../../dialogs/dynamic-measure.component';
import {OrderlineService} from '../orderline.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit {
  @Input() stepper:any={};
  @Input() order: OrderModel;
  @Input() orderlines: any[] = [];
  @ViewChild('measureForm') form;
  public selectedOrderlines: OrderLineModel[] = [];
  public locations = locations;
  public isSelfEditLocationName: boolean = false;
  public products = products;
  public locationTypeCode1 = ''; // set locationType
  public locationTypeCode2 = '';
  public selectedProducts: any[] = [];
  public locationTypeSelected = false;
  public locationName: string;
  public isProgressive: boolean = false;

  constructor(
    private orderlineService: OrderlineService,
    private router: Router,
    private snackBar: MatSnackBar,
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
      order:{id:this.order.id},
      locationName:this.locationName,
      locationType:this.locationTypeCode1+ " " + this.locationTypeCode2
    });
    const dialogRef = this.dialog.open(DynamicMeasureComponent,{
      data:{
        orderline: orderline,
        count:this.getProductCount(orderline.product.productValue),
        isEdit: true
      },
      autoFocus:true,
      disableClose: true
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if(!data.orderlines) return;
        if(data.orderlines)
        this.pushOrderlines([...data.orderlines]);
        else this.snackBar.open("Ölçü Eklenemedi, Tekrar Deneyin",null,{
          duration:3000
        });
      })
  }

  private pushOrderlines(orderlines: OrderLineModel[]){
    this.isProgressive = true;
    if(orderlines.length===1)
      this.orderlineService.add(orderlines[0])
        .finally(() => this.isProgressive = false)
        .subscribe((response: any) => {
          orderlines[0].lineAmount = response.lineAmount;
          orderlines[0].id= response.id;
          this.order.totalAmount = response.order.totalAmount || 0;
          this.deleteFromCart([orderlines[0]]);
          this.openSnackBar();
        },
          (err: any) => {
          if(err.status && err.status === 400) {
            const snackBarRef =
              this.snackBar
                .open("Ölçü Eklenemedi, sipariş silinmiş olabilir", "Siparişler", {
                  duration: 6000
            });
            snackBarRef.onAction()
              .subscribe(() => this.router.navigateByUrl("/dashboard/orders"))
          }
          });
    else
    this.orderlineService.addList(orderlines)
      .finally(() => this.isProgressive = false)
      .subscribe((response: any) => {
        if(response.orderLines){
          this.order.totalAmount = response.orderTotalAmount;
          this.deleteFromCart([...response.orderLines]);
          this.openSnackBar();
        }

      })
  }

  private deleteFromCart(orderlines: OrderLineModel[]) {
    if(orderlines.length<=0) return;
    orderlines.forEach((orderline,i) => {
      this.orderlines.push(orderline);
    });
    this.clearProduct(orderlines[0].product.productValue)
  }

  private openSnackBar() {
    let snackBarRef = this.snackBar.open('Ölçü Kaydedildi', 'Listeye Bak',{
      duration:6000
    });
    snackBarRef.onAction()
      .subscribe(() => {
        this.stepper.count = 3;
      });
  }
}
