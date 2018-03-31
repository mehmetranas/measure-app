import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TailorViewComponent } from '../tailor-view/tailor-view.component';
import {tailorRoute} from "../routers/tailor-routers";
import {SharedModule} from "./shared.module";
import {OrderService} from "../order-form/order.service";
import {AppInterceptor} from "../app.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {OrderlineService} from "../order-line-form/orderline.service";
import { TailorOrdersComponent } from '../tailor-view/tailor-orders.component';
import {DialogModule} from "./dialog.module";
import {OrderlinePropertyService} from "../order-line-form/orderline-property.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    tailorRoute
  ],
  declarations: [TailorViewComponent, TailorOrdersComponent],
  providers: [
    OrderService,
    OrderlineService,
    OrderlinePropertyService,
    { provide:HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    }
  ]
})
export class TailorModule { }
