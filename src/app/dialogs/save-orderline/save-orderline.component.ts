import {Component, Inject,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-save-orderline',
  templateUrl: './save-orderline.component.html',
  styleUrls: ['./save-orderline.component.css']
})
export class SaveOrderlineComponent {

  public deposit: number;
  constructor(
    public dialogRef: MatDialogRef<SaveOrderlineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  updateLineAmount(){
    console.log(this.deposit)
  }
  closeDialog(): void {}


}
