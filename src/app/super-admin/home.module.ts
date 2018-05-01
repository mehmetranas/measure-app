import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TenantsComponent} from "./tenants/tenants.component";
import {DialogModule} from "../modules/dialog.module";
import {SharedModule} from "../modules/shared.module";
import {superRouting} from "./super.router";
import {AppInterceptor} from "../app.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { ToolbarComponent } from './toolbar.component';
import { TenantsListComponent } from './tenants/tenants-list.component';
import {MainComponent} from "./main.component";
import { TenantComponent } from './tenants/tenant.component';
import {TenantService} from "./services/tenant.service";
import { UserListComponent } from './users/user-list.component';
import { RolePipe } from './helpers/role.pipe';
import { SuperSettingsComponent } from './super-settings.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    superRouting
  ],
  declarations: [
    TenantsComponent,
    ToolbarComponent,
    TenantsListComponent,
    MainComponent,
    TenantComponent,
    UserListComponent,
    RolePipe,
    SuperSettingsComponent
  ],
  providers:[
    TenantService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
