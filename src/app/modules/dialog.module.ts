import { NgModule } from '@angular/core';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import { InfoDialogComponent } from '../dialogs/info-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';
import { UpdateOrderComponent } from '../dialogs/update-order/update-order.component';
import { DynamicMeasureComponent } from '../dialogs/dynamic-measure.component';
import {SharedModule} from './shared.module';
import {CustomerAddComponent} from '../dialogs/customer-add.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    OrderFinalProcessComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent,
    CustomerAddComponent
  ],
  declarations: [
    OrderFinalProcessComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent,
    CustomerAddComponent
  ]
})

export class DialogModule { }
