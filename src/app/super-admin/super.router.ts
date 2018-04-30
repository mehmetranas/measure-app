import {RouterModule, Routes} from "@angular/router";
import {TenantsComponent} from "./tenants/tenants.component";
import {MainComponent} from "./main.component";
import {TenantComponent} from "./tenats/tenant.component";

const ROUTER: Routes = [
  {path:'',component:MainComponent,children:[
      {path:'',component:TenantsComponent},
      {path:'tenant',component:TenantComponent},
    ]},
  {path:'**', redirectTo:'/super/tenants'}
];
export const superRouting = RouterModule.forChild(ROUTER);

