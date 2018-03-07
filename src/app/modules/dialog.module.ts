import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatTooltipModule,
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UpdateOrderComponent } from '../dialogs/update-order/update-order.component';
import { DynamicMeasureComponent } from '../dialogs/dynamic-measure/dynamic-measure.component';
import {PrimengModule} from './primeng.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    PrimengModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  entryComponents: [
    ChooseMechanismDialogComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent

  ],
  declarations: [
    ChooseMechanismDialogComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent,
    DynamicMeasureComponent
  ]
})

export class DialogModule { }
