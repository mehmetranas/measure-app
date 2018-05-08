import { NgModule } from '@angular/core';
import {SharedModule} from './shared.module';
import {sidenavRouting} from '../routers/sidenav.router';
import {FooterComponent} from '../footer/footer.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {MeasureFormComponent} from '../order-line-form/measure-form/measure-form.component';
import {ReportsComponent} from '../reports/reports.component';
import {OrderlinePropertyService} from '../order-line-form/orderline-property.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { TenantUsersListComponent } from '../settings/users/tenant-users-list.component';
import {SettingsService} from "../settings/settings.service";

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    sidenavRouting
  ],
  declarations: [
    FooterComponent,
    ReportsComponent,
    OrderFormComponent,
    MeasureFormComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    AddCustomerComponent,
    DashboardComponent,
    TenantUsersListComponent
  ],
  providers: [
    AdminGuard,
    CustomerService,
    OrderService,
    OrderlineService,
    SettingsService,
    OrderlinePropertyService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class HomeModule {
  constructor() {}
}
