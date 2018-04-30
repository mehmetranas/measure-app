import {RouterModule, Routes} from "@angular/router";
import {TenantsComponent} from "./tenants/tenants.component";
import {SuperAuthGuardGuard} from "./services/super-auth-guard.guard";
import {MainComponent} from "./main.component";


const ROUTER: Routes = [
  {path:'',component:MainComponent,children:[
      {path:'',component:TenantsComponent}
    ]},
  {path:'**', redirectTo:'/super/tenants'}
];
export const superHomeRouting = RouterModule.forChild(ROUTER);

