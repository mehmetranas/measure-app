import {RouterModule, Routes} from '@angular/router';

import {OrderComponent} from '../order/order.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {OrderFormComponent} from '../order-form/order-form.component';
import {OrdersComponent} from '../orders/orders.component';

const ROUTER: Routes = [
  // {path: '**', redirectTo:"/" },
  {path: 'orders', component: OrdersComponent},
  {path: 'order/:id', component: OrderComponent},
  {path: 'wallet', component: WalletComponent },
  {path: 'campaigns', component: CampaignComponent },
  {path: 'reports', component: ReportsComponent },
  {path: 'order-form', component: OrderFormComponent },
  {path: 'order-form/:id', component: OrderFormComponent },
];

export const sidenavRouting = RouterModule.forRoot(ROUTER);
