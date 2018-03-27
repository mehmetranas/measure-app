import { NgModule } from '@angular/core';
import {SharedModule} from './shared.module';
import {sidenavRouting} from '../routers/sidenav.router';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {ViewCustomerComponent} from '../customer/view-customer.component';
import {OrderlinesComponent} from '../orderlines/orderlines.component';
import {OrderlineViewComponent} from '../orderline/orderline-view/orderline-view.component';
import {FooterComponent} from '../footer/footer.component';
import {OrdersComponent} from '../orders/orders.component';
import {CampaignsComponent} from '../campaigns/campaigns.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {MeasureFormComponent} from '../order-line-form/measure-form/measure-form.component';
import {CustomerFormComponent} from '../customer/customer-form.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {OrderlineComponent} from '../orderline/orderline.component';
import {SignupComponent} from '../user/signup/signup.component';
import {OrderComponent} from '../order/order.component';
import {StepperService} from '../order-form/stepper.service';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {OrderlineFormService} from '../order-line-form/orderline-form.service';
import {CustomerService} from '../customer/customer.service';
import {OrderService} from '../order-form/order.service';
import {AppInterceptor} from '../app.interceptor';
import {OrderlineService} from '../order-line-form/orderline.service';
import {CommonModule} from '@angular/common';
import {DialogModule} from './dialog.module';
import { CustomerListComponent } from '../customer/customer-list.component';
import {AuthService} from '../user/services/login.service';
import { CustomerDetailComponent } from '../customer/customer-detail.component';
import { AddCustomerComponent } from '../customer/add-customer.component';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    sidenavRouting
  ],
  declarations: [
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
    CustomerListComponent,
    CustomerDetailComponent,
    AddCustomerComponent
  ],
  providers: [
    CustomerService,
    OrderService,
    OrderlineService,
    StepperService,
    OrderlinePropertyService,
    OrderlineFormService,
    { provide:HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    }
  ]
})
export class HomeModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // const enhancer = isDevMode() ? [devTools.enhancer()] : [];
    //   ngRedux.configureStore(rootReducer, Initial_States, [], enhancer);
    // ngRedux.configureStore(rootReducer, Initial_States);
  }
}
