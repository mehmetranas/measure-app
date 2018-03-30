import {NgModule} from '@angular/core';
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
  MatGridListModule,
  MatDatepickerModule,
  MatChipsModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
  MatSlideToggleModule
} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@NgModule ({
  imports: [
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
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ],
  exports: [
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
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'}
  ]
})

export class MaterialModule{

}
