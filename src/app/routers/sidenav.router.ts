import {RouterModule, Routes} from '@angular/router';

import {OrderComponent} from '../order/order.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {OrdersComponent} from '../orders/orders.component';
import {CustomerListComponent} from '../customer/customer-list.component';
import {CustomerDetailComponent} from '../customer/customer-detail.component';
import {AddCustomerComponent} from '../customer/add-customer.component';
import {AdminGuard} from '../auth/admin.guard';

const ROUTER: Routes = [
  {path: '', component: OrdersComponent, pathMatch:'full'},
  {path: 'order/:id', component: OrderComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orders/:customerId', component: OrdersComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'new-customer', component: AddCustomerComponent},
  {path: 'customers/:id', component: CustomerDetailComponent},
  {path: 'wallet', component: WalletComponent,
    canActivate:[AdminGuard] },
  {path: 'reports', component: ReportsComponent,
    canActivate:[AdminGuard] },
  {path: 'campaigns', component: CampaignComponent },
  {path: 'order-form/:id', component: OrderFormComponent },
  {path: '**', redirectTo:"/" },
];

export const sidenavRouting = RouterModule.forChild(ROUTER);
