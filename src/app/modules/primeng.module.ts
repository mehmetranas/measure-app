import { NgModule } from '@angular/core';
import {ConfirmDialogModule, DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule
  ],
  exports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class PrimengModule { }
