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
import {ViewCustomerComponent} from '../customer/view-customer.component';
import {KeepNegativeDirective} from '../helpers/keep-negative.directive';
import {DisablePasteDirective} from '../helpers/disable-paste.directive';
import {TextMaskModule} from 'angular2-text-mask';
import { OrderStatusPipe } from '../helpers/order-status.pipe';
import {OrdersComponent} from "../orders/orders.component";
import {OrderlinesComponent} from "../orderlines/orderlines.component";
import {OrderComponent} from "../order/order.component";
import {NotificationsComponent} from "../toolbar/notifications.component";
import { CalculateTimePipe } from '../helpers/calculate-time.pipe';

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
    ToolbarComponent,
    SidenavComponent,
    OrderlinesComponent,
    OrderlineComponent,
    OrderlineViewComponent,
    CustomerFormComponent,
    ViewCustomerComponent,
    KeepNegativeDirective,
    DisablePasteDirective,
    NotificationsComponent,
    OrderStatusPipe,
    CalculateTimePipe
  ],
  exports: [
    FormsModule,
    RouterModule,
    NotificationsComponent,
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
    ToolbarComponent,
    SidenavComponent,
    OrderStatusPipe,
    CalculateTimePipe
  ]
})
export class SharedModule { }
