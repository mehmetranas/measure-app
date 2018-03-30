import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TailorViewComponent } from '../tailor-view/tailor-view.component';
import {tailorRoute} from "../routers/tailor-routers";
import {SharedModule} from "./shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    tailorRoute
  ],
  declarations: [TailorViewComponent]
})
export class TailorModule { }
