import {RouterModule, Routes} from '@angular/router';

import {OrderComponent} from '../order/order.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {OrdersComponent} from '../orders/orders.component';
import {CustomerListComponent} from '../customer/customer-list.component';
import {CustomerDetailComponent} from '../customer/customer-detail.component';

const ROUTER: Routes = [
  {path: '', component: ReportsComponent, pathMatch:'full'},
  {path: 'order/:id', component: OrderComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orders/:customerId', component: OrdersComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'customers/:id', component: CustomerDetailComponent},
  {path: 'wallet', component: WalletComponent },
  {path: 'campaigns', component: CampaignComponent },
  {path: 'reports', component: ReportsComponent },
  {path: 'order-form/:id', component: OrderFormComponent },
  {path: '**', redirectTo:"/" },
];

export const sidenavRouting = RouterModule.forChild(ROUTER);
