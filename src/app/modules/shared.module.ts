import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderlineComponent} from '../orderline/orderline.component';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from './primeng.module';
import {NgReduxModule} from '@angular-redux/store';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ViewCustomerComponent} from '../customer/view-customer.component';
import { CustomerFormComponent } from '../customer/customer-form.component';
import { OrderlineViewComponent } from '../orderline/orderline-view/orderline-view.component';
import { HomeComponent } from '../home.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {OrderlinesComponent} from '../orderlines/orderlines.component';
import {FooterComponent} from '../footer/footer.component';
import {OrdersComponent} from '../orders/orders.component';
import {CampaignsComponent} from '../campaigns/campaigns.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {MeasureFormComponent} from '../order-line-form/measure-form/measure-form.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {SignupComponent} from '../user/signup/signup.component';
import {OrderComponent} from '../order/order.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule,
    RouterModule
  ],
  declarations: [
    OrderlineComponent,
    ViewCustomerComponent,
    CustomerFormComponent,
    OrderlineViewComponent,
    HomeComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    OrderComponent,
    WalletComponent,
    CampaignsComponent,
    CampaignComponent,
    ReportsComponent,
    OrderFormComponent,
    MeasureFormComponent,
    SignupComponent,
    OrderlinesComponent,
    OrdersComponent
  ],
  exports: [
    CommonModule,
    OrderlineComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxModule,
    HttpClientModule,
    PrimengModule,
    ViewCustomerComponent,
    CustomerFormComponent,
    OrderlineViewComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    OrderComponent,
    WalletComponent,
    CampaignsComponent,
    CampaignComponent,
    ReportsComponent,
    OrderFormComponent,
    MeasureFormComponent,
    SignupComponent,
    OrderlinesComponent,
    OrdersComponent,
    HomeComponent
  ]
})
export class SharedModule { }
