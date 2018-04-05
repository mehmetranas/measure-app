import { NgModule } from '@angular/core';
import {
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  DataTableModule,
  InputMaskModule,
  MultiSelectModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  SidebarModule,
  SpinnerModule,
  ToggleButtonModule
} from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    DataTableModule,
    ConfirmDialogModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    ToggleButtonModule,
    SpinnerModule,
    RadioButtonModule,
    CheckboxModule,
    SidebarModule
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
    CheckboxModule,
    SidebarModule
  ]
})
export class PrimengModule { }
