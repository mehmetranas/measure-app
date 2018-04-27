import { Component } from '@angular/core';
import {MAT_LABEL_GLOBAL_OPTIONS, MatSnackBar} from '@angular/material';
import {OrderService} from '../order-form/order.service';
import {OrderModel} from '../models/order.model';
import 'rxjs/add/operator/take';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';
import {finalize, take} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  template: `
   <div>
     <form>
       <div fxLayout="row" fxLayoutGap="-30px" fxLayoutAlign="none center">
         <div>
           <mat-icon matPrefix>search</mat-icon>
           <input class="search-bar text-capitalize" name="searchTerm" [(ngModel)]="searchTerm" (keyup)="search($event)" type="text"
                  placeholder="Sipariş Numarası">
         </div>
         <div *ngIf="isPending">
           <mat-spinner matSuffix [diameter]="20"></mat-spinner>
         </div>
       </div>
     </form>
   </div>
  `,
  styles: [`
    .search-bar{
      width: 50vw;
      border: 1px solid #eee;
      text-indent: 35px;
      font-size: 1rem;
      line-height: 2.75rem;
    }
    .mat-icon{
      position: absolute;
      top: 30%;
      left: 65px;
      color: rgba(0,0,0,.87);
    }
  `],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}}
  ]
})
export class SearchBarComponent {
  public searchTerm: string;
  public isPending = false;

  constructor(private orderService: OrderService, private router: Router, private snackBar: MatSnackBar) {}

  public search(event) {
    if (event.keyCode === 13) {
      this.searchTerm = this.searchTerm.trim();
      if (!this.searchTerm) { return; }
      this.isPending = true;
      this.orderService.searchOrder(this.searchTerm)
        .pipe(
          take(1),
          finalize(() => this.isPending = false))
        .subscribe((orders: OrderModel[]) => {
          if (orders.length > 0) {
            this.router.navigate(['/user/order', orders[0].id], {queryParams: {'searchTerm': orders[0].orderNumber}});
          } else {
            this.snackBar.open('Aramanız ile eşleşen bir sipariş bulunamadı', 'Tamam', {duration: 5000, verticalPosition: 'top'});
          }
          this.searchTerm = null;
        });
    }
  }
}
