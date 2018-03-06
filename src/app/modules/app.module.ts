import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';


import { AppComponent } from '../app.component';
import {MaterialModule} from './material.module';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FooterComponent } from '../footer/footer.component';
import {IAppState, Initial_States, rootReducer} from '../redux/stores/app.store';
import { OrderComponent } from '../order/order.component';
import {sidenavRouting} from '../sidenav/sidenav.router';
import { WalletComponent } from '../wallet/wallet.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { CampaignComponent } from '../campaign/campaign.component';
import { ReportsComponent } from '../reports/reports.component';
import { CustomerComponent } from '../customer/customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerService} from '../customer/customer.service';
import { OrderFormComponent } from '../order-form/order-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MeasureFormComponent } from '../order-line-form/measure-form/measure-form.component';
import { LoginComponent } from '../user/login/login.component';
import { SignupComponent } from '../user/signup/signup.component';
import {toolbarRouting} from '../toolbar/toolbar.router';
import {AuthService} from '../user/services/login.service';
import {AppInterceptor} from '../app.interceptor';
import {OrderService} from '../order-form/order.service';
import {OrderlineService} from '../order-line-form/orderline.service';
import {StepperService} from '../order-form/stepper.service';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';
import { OrderlinesComponent } from '../orderlines/orderlines.component';
import { OrderlineComponent } from '../orderline/orderline.component';
import { OrdersComponent } from '../orders/orders.component';
import {PrimengModule} from './primeng.module';
import { KeysPipe } from '../keys.pipe';
import {OrderlineFormService} from '../order-line-form/orderline-form.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    OrderComponent,
    WalletComponent,
    CampaignsComponent,
    CampaignComponent,
    ReportsComponent,
    CustomerComponent,
    OrderFormComponent,
    MeasureFormComponent,
    LoginComponent,
    SignupComponent,
    OrderlinesComponent,
    OrderlineComponent,
    OrdersComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    PrimengModule,
    NgReduxModule,
    sidenavRouting,
    toolbarRouting,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerService,
    AuthService,
    OrderService,
    OrderlineService,
    StepperService,
    OrderlinePropertyService,
    { provide:HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    },
    OrderlineFormService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // const enhancer = isDevMode() ? [devTools.enhancer()] : [];
    //   ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
      ngRedux.configureStore(rootReducer, Initial_States);
  }
}
