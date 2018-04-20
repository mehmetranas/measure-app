import { Component, OnInit } from '@angular/core';
import {MAT_LABEL_GLOBAL_OPTIONS} from "@angular/material";
import {OrderService} from "../order-form/order.service";
import {OrderModel} from "../models/order.model";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-search-bar',
  template: `
   <div>
     <form>
       <mat-icon matPrefix>search</mat-icon>
       <input class="search-bar" name="searchTerm" [(ngModel)]="searchTerm" (keyup)="search($event)" type="text" placeholder="Sipariş Numarası">
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
  public searchTerm:string;

  constructor(private orderService:OrderService){}

  public search(event){
    if(event.keyCode === 13){
      this.orderService.searchOrder(this.searchTerm)
        .take(1)
        .subscribe((orders: OrderModel[]) => {
          console.log(orders);
        })
    }
  }
}
