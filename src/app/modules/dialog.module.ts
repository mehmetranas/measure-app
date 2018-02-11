import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatListModule,
  MatRadioModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ChooseMechanismDialogComponent} from '../dialogs/choose-mechanism-dialog/choose-mechanism-dialog.component';
import {SaveOrderlineComponent} from '../dialogs/save-orderline/save-orderline.component';

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
    FormsModule
  ],
  entryComponents: [
    ChooseMechanismDialogComponent,
    SaveOrderlineComponent
  ],
  declarations: [
    ChooseMechanismDialogComponent,
    SaveOrderlineComponent
  ]
})

export class DialogModule { }
