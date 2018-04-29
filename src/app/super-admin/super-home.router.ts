import {RouterModule, Routes} from "@angular/router";
import {TenantsComponent} from "./tenants.component";


const ROUTER: Routes = [
  {path:'',component:TenantsComponent},
  {path:'**', redirectTo:'/super/tenants'}
];
export const superHomeRouting = RouterModule.forChild(ROUTER);

