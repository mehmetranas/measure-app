import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSelectModule,
  MatRadioModule,
  MatStepperModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule, MatDatepickerModule, MatChipsModule,
} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {DialogModule} from './dialog.module';


@NgModule ({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatMenuModule,
    DialogModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatMenuModule,
    DialogModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatChipsModule
  ]
})

export class MaterialModule{

}
