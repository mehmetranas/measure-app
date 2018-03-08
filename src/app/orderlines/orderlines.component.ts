import {Component, Input, OnInit} from '@angular/core';
import { locations, products} from '../helpers';
import {OrderlineService} from '../order-line-form/orderline.service';
import 'rxjs/add/operator/finally';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {OrderLineModel} from '../models/order-line.model';
import {DynamicMeasureComponent} from '../dialogs/dynamic-measure/dynamic-measure.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent implements OnInit {
  @Input() orderlines: any[];
  @Input() responsive: false;
  @Input() autoLayout: false;
  @Input() addedPossibilty: false;
  public locations = locations;
  public productTypes = products;
  public cols: any = [];
  public showPending = false;

  constructor(private orderlineService: OrderlineService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.cols =  [
      {field:"locationName",header:"Mekan"},
      {field:"product.productValue",header:"Perde Türü"},
      {field:"locationType",header:"Kapı/Cam"},
      {field:"propertyWidth",header:"En (cm)"},
      {field:"propertyHeight",header:"Boy (cm)"},
      {field:"unitPrice",header:"Birim Fiyat"},
      {field:"lineAmount",header:"Toplam"},
      {field:"",header:"İşlemler"}
    ];
  }

  public deleteProcessConfirmation(id: number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data:
          {message:"Bu sipariş ölçüsünü silmek istediğinizden emin misiniz?"},
      width:"220"});
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data: any) => {
        if(!data) return;
        if(data.answer) this.delete(id);
      })
  }

  public delete(id: number){
    this.showPending = true;
    this.orderlineService.deleteById(id)
      .finally(() => this.showPending=false)
      .subscribe(() => {
        const index = this.orderlines.findIndex((ol) => ol.id === id);
        if(index>-1) this.orderlines.splice(index,1);
        },
        (err) => console.log(err));
  }

  public editOrderline(orderline) {
    this.openDialog(orderline);
  }

  private openDialog(orderline: OrderLineModel) {
    const dialogRef = this.dialog.open(DynamicMeasureComponent,{
      data:{
        orderline:{...orderline,product:{...orderline.product},order:{...orderline.order}},
        count:1
      },
      disableClose: true,
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if(!data) return;
        if(!data.orderlines) return;
        this.orderlineService.add(data.orderlines[0])
          .subscribe((response:any) => {
            data.orderlines[0].lineAmount = response.lineAmount;
            const index = this.orderlines
              .findIndex((orderline: OrderLineModel) => orderline.id === data.orderlines[0].id);
            if(index>-1)
              this.orderlines[index] = data.orderlines[0];
          },
            (err: any) => {
              if(err.status && err.status === 400) {
                  this.snackBar
                    .open("Ölçü güncellenemedi, sipariş silinmiş olabilir", null, {
                      duration: 6000
                    });
              }
            })
      })
  }

  public addOrderline(){
    this.activatedRoute.params
      .subscribe(params => {
        const orderId = +params["id"];
        this.router.navigate(["order-form",orderId]);
      });
  }
}
