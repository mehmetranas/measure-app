import {Component, Input} from '@angular/core';
import {  products} from '../helpers';
import {OrderlineService} from '../order-line-form/orderline.service';
import 'rxjs/add/operator/finally';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog.component';
import {OrderLineModel} from '../models/order-line.model';
import {DynamicMeasureComponent} from '../dialogs/dynamic-measure.component';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderModel} from '../models/order.model';

@Component({
  selector: 'app-orderlines',
  templateUrl: './orderlines.component.html',
  styleUrls: ['./orderlines.component.css']
})
export class OrderlinesComponent {
  @Input() orderlines: any[];
  @Input() responsive: false;
  @Input() autoLayout: false;
  @Input() displayOrder = false;
  @Input() addedPossibilty: false;
  @Input() isTailor: false;
  @Input() order: OrderModel;
  public productTypes = products;
  public isPending = false;

  constructor(private orderlineService: OrderlineService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) { }

  public deleteProcessConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data:
          {message: 'Bu sipariş ölçüsünü silmek istediğinizden emin misiniz?'},
      width: '220'});
    dialogRef.afterClosed()
      .take(1)
      .subscribe((data: any) => {
        if (!data) { return; }
        if (data.answer) { this.delete(id); }
      });
  }

  public delete(id: number) {
    this.isPending = true;
    this.orderlineService.deleteById(id)
      .finally(() => this.isPending = false)
      .subscribe(() => {
        const index = this.orderlines.findIndex((ol) => ol.id === id);
        if (index > -1) { this.orderlines.splice(index, 1); }
        },
        (err) => console.log(err));
  }

  public editOrderline(orderline) {
    this.openDialog(orderline);
  }

  private openDialog(orderline: OrderLineModel) {
    const dialogRef = this.dialog.open(DynamicMeasureComponent, {
      data: {
        orderline: {...orderline, product: {...orderline.product}, order: {...orderline.order}},
        count: 1,
        isEdit: false
      }
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if (!data) { return; }
        if (!data.orderlines) { return; }
        switch (data.action) {
          case 'add': {
            this.saveOrderline(data.orderlines[0]);
            break;
          }
          case 'delete': {
            this.delete(data.orderlines[0].id);
            break;
          }
        }
      });
  }

  private saveOrderline(orderline: OrderLineModel) {
    this.isPending = true;
    this.orderlineService.add(orderline) //We get first element because update method include just one orderline
      .finally(() => this.isPending = false)
      .subscribe((response: any) => {
          orderline.lineAmount = response.lineAmount;
          const index = this.orderlines
            .findIndex((or: OrderLineModel) => or.id === orderline.id);
          if (index > -1) {
            this.orderlines[index] = orderline;
          }
          this.snackBar.open('Ürün güncellendi', 'Tamam', {duration: 3000});
        },
        (err: any) => {
          if (err.status && err.status === 400) {
            this.snackBar
              .open('Ölçü güncellenemedi, sipariş silinmiş olabilir', null, {
                duration: 6000
              });
          }
        });
  }

  public addOrderline() {
    const orderId = +this.activatedRoute.snapshot.paramMap.get('id');
    if (orderId) {
      this.router.navigate(['user/order-form', orderId]);
    }
  }

  public viewOrderline(orderline: OrderLineModel) {
    if (!this.isTailor) { return; }
    const dialogRef = this.dialog.open(DynamicMeasureComponent, {
      data: {
        orderline: orderline,
        count: 1,
        isEdit: false,
        isTailor: true
      }
    });
    dialogRef.afterClosed()
      .subscribe((data) => {
        if (!data) { return; }
        if (!data.orderlines) { return; }
        switch (data.action) {
          case 'add': {
            this.saveOrderline(data.orderlines[0]);
            break;
          }
          case 'delete': {
            this.delete(data.orderlines[0].id);
            break;
          }
        }
      });
  }
}
