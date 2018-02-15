import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatRadioModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {SaveOrderlineComponent} from '../dialogs/save-orderline/save-orderline.component';
import {OrderFinalProcessComponent} from '../dialogs/order-final-process/order-final-process.component';

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
    FormsModule
  ],
  entryComponents: [
    ChooseMechanismDialogComponent,
    SaveOrderlineComponent,
    OrderFinalProcessComponent
  ],
  declarations: [
    ChooseMechanismDialogComponent,
    SaveOrderlineComponent,
    OrderFinalProcessComponent
  ]
})

export class DialogModule { }
