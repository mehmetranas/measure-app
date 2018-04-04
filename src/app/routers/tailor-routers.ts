import {RouterModule, Routes} from '@angular/router';
import {TailorViewComponent} from "../tailor-view/tailor-view.component";
import {OrderComponent} from "../order/order.component";
import {TailorOrdersComponent} from "../tailor-view/tailor-orders.component";
import {SidenavComponent} from "../sidenav/sidenav.component";


const ROUTER: Routes = [
  {path: '', component: SidenavComponent,
    children:[
      {path: '', component: TailorOrdersComponent},
      {path: 'order/:id', component: OrderComponent},
    ],
  },
  {path: '**', redirectTo:"/tailor"}
];

export const tailorRoute = RouterModule.forChild(ROUTER);
