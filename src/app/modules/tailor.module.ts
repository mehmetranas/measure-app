import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TailorViewComponent } from '../tailor-view/tailor-view.component';
import {tailorRoute} from "../routers/tailor-routers";
import {SharedModule} from "./shared.module";
import {OrderService} from "../order-form/order.service";
import {AppInterceptor} from "../app.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    tailorRoute
  ],
  declarations: [TailorViewComponent],
  providers: [
    OrderService,
    { provide:HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    }
  ]
})
export class TailorModule { }
