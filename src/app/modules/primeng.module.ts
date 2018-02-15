import { NgModule } from '@angular/core';
import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    DataTableModule,
    DialogModule,
  ],
  exports: [
    DataTableModule,
    DialogModule
  ]
})
export class PrimengModule { }
