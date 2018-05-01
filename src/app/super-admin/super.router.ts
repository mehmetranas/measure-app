import {RouterModule, Routes} from "@angular/router";
import {TenantsComponent} from "./tenants/tenants.component";
import {MainComponent} from "./main.component";
import {TenantComponent} from "./tenants/tenant.component";
import {SuperSettingsComponent} from "./super-settings.component";

const ROUTER: Routes = [
  {path:'',component:MainComponent,children:[
      {path:'',component:TenantsComponent},
      {path:'tenant',component:TenantComponent},
      {path:'settings',component:SuperSettingsComponent}
    ]},
  {path:'**', redirectTo:'/super'}
];
export const superRouting = RouterModule.forChild(ROUTER);

