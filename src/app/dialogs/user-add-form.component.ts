import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {InfoDialogComponent} from "./info-dialog.component";

@Component({
  selector: 'app-user-add-form',
  template: `
    <p>
      user-add-form works!
    </p>
  `,
  styles: []
})
export class UserAddFormComponent implements OnInit {
  public role:string;

  constructor(
    public dialogRef: MatDialogRef<UserAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data=this.role;
  }

  ngOnInit() {
    console.log(this.role)
  }

}
