import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from '../order/order.component';
import {ReportsComponent} from '../reports/reports.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {OrdersComponent} from '../orders/orders.component';
import {CustomerListComponent} from '../customer/customer-list.component';
import {CustomerDetailComponent} from '../customer/customer-detail.component';
import {AddCustomerComponent} from '../customer/add-customer.component';
import {AdminGuard} from '../auth/admin.guard';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SettingsComponent} from '../settings/settings.component';
import {UserAddComponent} from '../settings/user-add.component';

const ROUTER: Routes = [
  {path: '', component: SidenavComponent, children: [
      {path: '', component: DashboardComponent },
      {path: 'order/:id', component: OrderComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'orders/:customerId', component: OrdersComponent},
      {path: 'customers', component: CustomerListComponent},
      {path: 'new-customer', component: AddCustomerComponent},
      {path: 'customers/:id', component: CustomerDetailComponent},
      {path: 'settings', component: SettingsComponent },
      {path: 'reports', component: ReportsComponent,
        canActivate: [AdminGuard] },
      {path: 'users', component: UserAddComponent,
        canActivate: [AdminGuard] },
      {path: 'order-form/:id', component: OrderFormComponent },
    ]},
  {path: '**', redirectTo: 'user' },
];

export const sidenavRouting = RouterModule.forChild(ROUTER);
