import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from './primeng.module';
import {HttpClientModule} from '@angular/common/http';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {RouterModule} from '@angular/router';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {OrderlineComponent} from '../orderline/orderline.component';
import {OrderlineViewComponent} from '../orderline/orderline-view/orderline-view.component';
import {CustomerFormComponent} from '../customer/customer-form.component';
import {ViewCustomerComponent} from '../customer/view-customer.component';
import {KeepNegativeDirective,OrderStatusPipe,DisablePasteDirective,CalculateTimePipe} from '../helpers';
import {TextMaskModule} from 'angular2-text-mask';
import {OrdersComponent} from "../orders/orders.component";
import {OrderlinesComponent} from "../orderlines/orderlines.component";
import {OrderComponent} from "../order/order.component";
import {NotificationsComponent} from "../toolbar/notifications.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ChartComponent } from '../chart.component';
import { SearchBarComponent } from '../toolbar/search-bar.component';
import { SettingsComponent } from '../settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule,
    TextMaskModule,
    FlexLayoutModule
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
    CalculateTimePipe,
    ChartComponent,
    SearchBarComponent,
    SettingsComponent
  ],
  exports: [
    FormsModule,
    RouterModule,
    NotificationsComponent,
    ReactiveFormsModule,
    MaterialModule,
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
    SettingsComponent,
    TextMaskModule,
    ToolbarComponent,
    SidenavComponent,
    OrderStatusPipe,
    CalculateTimePipe,
    FlexLayoutModule,
    ChartComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
