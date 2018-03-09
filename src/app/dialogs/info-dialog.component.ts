import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {orderStatus} from '../helpers';

@Component({
  selector: 'app-info-dialog',
  template: `
    <ng-container *ngIf="orderStatusObj">
      <div role="alert">
        <h4 class="alert-heading text-danger">Kayıt İşlemi</h4>
        <p>{{ orderStatusObj.message }}</p>
        <hr>
        <p class="mb-0">
          <mat-checkbox *ngIf="isToBeMeasureDisplay" [(ngModel)]="isToBeMeasure">Ölçüye Gidildi</mat-checkbox>
        </p>
      </div>
      <mat-card-actions>
        <button mat-button color="warn" (click)="closeDialog(false)">Vazgeç</button>
        <button mat-raised-button color="accent" (click)="closeDialog(true)">Tamam</button>
      </mat-card-actions>
    </ng-container>
  `,
  styles: [``]
})
export class InfoDialogComponent implements OnInit{
  public dataObj;
  public orderStatusObj;
  public isToBeMeasureDisplay:boolean;
  public isToBeMeasure:boolean;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataObj=data;
  }

  ngOnInit(){
    this.orderStatusObj=orderStatus[Object.keys(orderStatus)[this.dataObj.statusValue]];
    if(this.dataObj.statusValue === orderStatus['Eksik Sipariş'].value)
      this.isToBeMeasureDisplay=this.dataObj.isToBeMeasureDisplay;
  }

  public closeDialog(answer=false): void {
    let orderStatusValue;
    if(this.isToBeMeasureDisplay&&!this.isToBeMeasure)
      orderStatusValue=orderStatus['Ölçüye Gidilecek'].value;
    else if(this.isToBeMeasureDisplay&&this.isToBeMeasure)
      orderStatusValue=orderStatus['Eksik Sipariş'].value;
    else
      orderStatusValue=this.dataObj.statusValue;
    this.dialogRef.close({
      answer:answer,
      order:{
        orderStatus:orderStatusValue
      }
    })
  }
}
