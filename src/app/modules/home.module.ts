import { NgModule } from '@angular/core';
import {SharedModule} from './shared.module';
import {sidenavRouting} from '../routers/sidenav.router';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {IAppState} from '../redux/stores/app.store';
import {FooterComponent} from '../footer/footer.component';
import {CampaignsComponent} from '../campaigns/campaigns.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {MeasureFormComponent} from '../order-line-form/measure-form/measure-form.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {SignupComponent} from '../auth/signup/signup.component';
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
import { CustomerDetailComponent } from '../customer/customer-detail.component';
import { AddCustomerComponent } from '../customer/add-customer.component';
import {AdminGuard} from '../auth/admin.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    sidenavRouting
  ],
  declarations: [
    FooterComponent,
    WalletComponent,
    CampaignsComponent,
    CampaignComponent,
    ReportsComponent,
    OrderFormComponent,
    MeasureFormComponent,
    SignupComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    AddCustomerComponent,
    DashboardComponent
  ],
  providers: [
    AdminGuard,
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
