import { NgModule } from '@angular/core';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UpdateOrderComponent } from '../dialogs/update-order/update-order.component';
import { DynamicMeasureComponent } from '../dialogs/dynamic-measure/dynamic-measure.component';
import {SharedModule} from './shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    OrderFinalProcessComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent

  ],
  declarations: [
    OrderFinalProcessComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent
  ]
})

export class DialogModule { }
