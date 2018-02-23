import { NgModule } from '@angular/core';
import {CalendarModule, ConfirmDialogModule, DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule
  ],
  exports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule
  ]
})
export class PrimengModule { }
