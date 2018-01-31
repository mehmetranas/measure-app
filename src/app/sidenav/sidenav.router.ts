import {RouterModule, Routes} from '@angular/router';

import {OrderComponent} from '../order/order.component';
import {WalletComponent} from '../wallet/wallet.component';
import {CampaignComponent} from '../campaign/campaign.component';
import {ReportsComponent} from '../reports/reports.component';
import {AddNewMeasureComponent} from '../add-new-measure/add-new-measure.component';

const ROUTER: Routes = [
  {path: 'orders', component: OrderComponent },
  {path: 'wallet', component: WalletComponent },
  {path: 'campaigns', component: CampaignComponent },
  {path: 'reports', component: ReportsComponent },
  {path: 'add-new-measure', component: AddNewMeasureComponent },
];

export const sidenavRouting = RouterModule.forRoot(ROUTER);
