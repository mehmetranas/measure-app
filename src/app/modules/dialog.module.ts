import { NgModule } from '@angular/core';
import { InfoDialogComponent } from '../dialogs/info-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';
import { UpdateOrderComponent } from '../dialogs/update-order/update-order.component';
import { DynamicMeasureComponent } from '../dialogs/dynamic-measure.component';
import {SharedModule} from './shared.module';
import {CustomerAddComponent} from '../dialogs/customer-add.component';
import {CommonModule} from '@angular/common';
import { NewPasswordDialogComponent } from '../dialogs/new-password-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent,
    CustomerAddComponent,
    NewPasswordDialogComponent
  ],
  declarations: [
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent,
    CustomerAddComponent,
    NewPasswordDialogComponent
  ]
})

export class DialogModule { }
