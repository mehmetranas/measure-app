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
import {SaveOrderlineComponent} from '../dialogs/save-orderline/save-orderline.component';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';

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
    SaveOrderlineComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent
  ],
  declarations: [
    ChooseMechanismDialogComponent,
    SaveOrderlineComponent,
    OrderFinalProcessComponent,
    InfoDialogComponent
  ]
})

export class DialogModule { }
