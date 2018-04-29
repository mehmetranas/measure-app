import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TenantsComponent} from "./tenants.component";
import {DialogModule} from "../modules/dialog.module";
import {SharedModule} from "../modules/shared.module";
import {superHomeRouting} from "./super-home.router";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    superHomeRouting
  ],
  declarations: [TenantsComponent]
})
export class HomeModule { }
