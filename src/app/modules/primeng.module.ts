import { NgModule } from '@angular/core';
import {CalendarModule, ConfirmDialogModule, DataTableModule, MultiSelectModule, ProgressSpinnerModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
    MultiSelectModule
  ],
  exports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
    MultiSelectModule
  ]
})
export class PrimengModule { }
