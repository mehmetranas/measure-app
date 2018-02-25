import { NgModule } from '@angular/core';
import {CalendarModule, ConfirmDialogModule, DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule,
    TableModule
  ],
  exports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule,
    TableModule
  ]
})
export class PrimengModule { }
