import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TailorViewComponent } from '../tailor-view/tailor-view.component';
import {tailorRoute} from "../routers/tailor-routers";

@NgModule({
  imports: [
    CommonModule,
    tailorRoute
  ],
  declarations: [TailorViewComponent]
})
export class TailorModule { }
