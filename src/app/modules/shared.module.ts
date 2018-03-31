import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from './primeng.module';
import {NgReduxModule} from '@angular-redux/store';
import {HttpClientModule} from '@angular/common/http';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {RouterModule} from '@angular/router';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {OrderlineComponent} from '../orderline/orderline.component';
import {OrderlineViewComponent} from '../orderline/orderline-view/orderline-view.component';
import {CustomerFormComponent} from '../customer/customer-form.component';
import {DialogModule} from './dialog.module';
import {ViewCustomerComponent} from '../customer/view-customer.component';
import {KeepNegativeDirective} from '../helpers/keep-negative.directive';
import {DisablePasteDirective} from '../helpers/disable-paste.directive';
import {TextMaskModule} from 'angular2-text-mask';
import { PhonePipe } from '../helpers/phone.pipe';
import { OrderStatusPipe } from '../helpers/order-status.pipe';
import {OrdersComponent} from "../orders/orders.component";
import {OrderlinesComponent} from "../orderlines/orderlines.component";
import {OrderComponent} from "../order/order.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgReduxModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule,
    TextMaskModule
  ],
  declarations: [
    OrderComponent,
    OrdersComponent,
    OrderlinesComponent,
    OrderlineComponent,
    OrderlineViewComponent,
    CustomerFormComponent,
    ViewCustomerComponent,
    KeepNegativeDirective,
    DisablePasteDirective,
    PhonePipe,
    OrderStatusPipe
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxModule,
    HttpClientModule,
    PrimengModule,
    OrderlineComponent,
    OrderComponent,
    OrdersComponent,
    OrderlinesComponent,
    OrderlineViewComponent,
    CustomerFormComponent,
    ViewCustomerComponent,
    KeepNegativeDirective,
    TextMaskModule,
    PhonePipe,
    OrderStatusPipe
  ]
})
export class SharedModule { }
