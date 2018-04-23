import {RouterModule, Routes} from '@angular/router';
import {TailorViewComponent} from "../tailor-view/tailor-view.component";
import {OrderComponent} from "../order/order.component";
import {TailorOrdersComponent} from "../tailor-view/tailor-orders.component";
import {SettingsComponent} from "../settings/settings.component";

const ROUTER: Routes = [
  {path: '', component: TailorViewComponent,
    children:[
      {path: '', component: TailorOrdersComponent},
      {path: 'order/:id', component: OrderComponent},
      {path: 'settings', component: SettingsComponent},
    ],
  },
  {path: '**', redirectTo:"/tailor"}
];

export const tailorRoute = RouterModule.forChild(ROUTER);
