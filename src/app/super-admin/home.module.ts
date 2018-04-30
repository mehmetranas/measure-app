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
import { TenantComponent } from './tenats/tenant.component';

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
    TenantComponent
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
