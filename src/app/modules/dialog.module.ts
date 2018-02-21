import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatNativeDateModule,
  MatRadioModule
} from '@angular/material';
import {MatDatepickerModule} from "@angular/material/datepicker"
import {FormsModule} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
import {MeasuredDateComponent} from '../dialogs/measured-date/measured-date.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

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
    FormsModule
  ],
  entryComponents: [
    ChooseMechanismDialogComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent,
    MeasuredDateComponent,
    ConfirmDialogComponent
  ],
  declarations: [
    ChooseMechanismDialogComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent,
    MeasuredDateComponent,
    ConfirmDialogComponent
  ]
})

export class DialogModule { }
