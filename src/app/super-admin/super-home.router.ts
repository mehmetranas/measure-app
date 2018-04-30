import {RouterModule, Routes} from "@angular/router";
import {TenantsComponent} from "./tenants/tenants.component";
import {SuperAuthGuardGuard} from "./super-auth-guard.guard";


const ROUTER: Routes = [
  {path:'',component:TenantsComponent},
  {path:'**', redirectTo:'/super/tenants'}
];
export const superHomeRouting = RouterModule.forChild(ROUTER);

