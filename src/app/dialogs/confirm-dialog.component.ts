import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <ng-container *ngIf="dataObj">
      <div role="alert">
        <h4 class="alert-heading text-danger">Dikkat</h4>
        <p>{{ dataObj.message }}</p>
        <hr>
        <p class="mb-0">
        </p>
      </div>
      <mat-card-actions>
        <button mat-button color="warn" (click)="closeDialog(false)">Hayır</button>
        <button mat-raised-button color="accent" (click)="closeDialog(true)">Evet</button>
      </mat-card-actions>
    </ng-container>
  `,
  styles: [``]
})
export class ConfirmDialogComponent {

  public dataObj;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataObj = data;
  }

  public closeDialog(answer= false): void {
    this.dialogRef.close({
      answer: answer,
    });
  }
}
