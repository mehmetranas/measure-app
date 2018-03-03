import {Component, Input, OnInit} from '@angular/core';
import {fontTypes, locations, mechanismTypes, mountTypes, products} from '../helpers';
import {OrderLineModel} from '../models/order-line.model';
import {OrderlineService} from '../order-line-form/orderline.service';
import 'rxjs/add/operator/finally';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent implements OnInit {
  @Input() detailed = false;
  @Input() orderlines: OrderLineModel[];
  @Input() responsive: false;
  @Input() autoLayout: false;
  public locations = locations;
  public productTypes = products;
  public mountTypes = mountTypes;
  public mechanismTypes = mechanismTypes;
  public  fontTypes = fontTypes;
  public cols: any = [];
  public showPending = false;

  constructor(private orderlineService: OrderlineService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.cols =  [
      {field:"locationName",header:"Mekan"},
      {field:"product.productValue",header:"Perde Türü"},
      {field:"locationType",header:"Kapı/Cam"},
      {field:"propertyWidth",header:"En (cm)"},
      {field:"propertyHeight",header:"Boy (cm)"},
      {field:"unitPrice",header:"Birim Fiyat"},
      {field:"lineAmount",header:"Toplam"}
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
}
