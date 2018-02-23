import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
import {MeasuredDateComponent} from '../dialogs/measured-date/measured-date.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UpdateOrderComponent } from '../dialogs/update-order/update-order.component';

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
    FormsModule
  ],
  entryComponents: [
    ChooseMechanismDialogComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent,
    MeasuredDateComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent

  ],
  declarations: [
    ChooseMechanismDialogComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent,
    MeasuredDateComponent,
    ConfirmDialogComponent,
    UpdateOrderComponent
  ]
})

export class DialogModule { }
