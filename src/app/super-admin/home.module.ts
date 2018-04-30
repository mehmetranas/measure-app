import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TenantsComponent} from "./tenants/tenants.component";
import {DialogModule} from "../modules/dialog.module";
import {SharedModule} from "../modules/shared.module";
import {superHomeRouting} from "./super-home.router";
import {AppInterceptor} from "../app.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    superHomeRouting
  ],
  declarations: [TenantsComponent, ToolbarComponent],
  providers:[
    { provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
