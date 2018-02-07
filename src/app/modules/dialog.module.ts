import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule} from '@angular/material';
import {ChooseMechanismDialogComponent} from '../order-line-form/measure-form/measure-form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  entryComponents: [
    ChooseMechanismDialogComponent
  ],
  declarations: [
    ChooseMechanismDialogComponent
  ]
})

export class DialogModule { }
