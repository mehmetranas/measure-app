import { NgModule } from '@angular/core';
import {
  CalendarModule, CheckboxModule, ConfirmDialogModule, DataTableModule, MultiSelectModule, ProgressSpinnerModule, RadioButtonModule,
  SpinnerModule,
  ToggleButtonModule
} from 'primeng/primeng';
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
    MultiSelectModule,
    ToggleButtonModule,
    SpinnerModule,
    RadioButtonModule,
    CheckboxModule
  ],
  exports: [
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    ToggleButtonModule,
    SpinnerModule,
    RadioButtonModule,
    CheckboxModule
  ]
})
export class PrimengModule { }
