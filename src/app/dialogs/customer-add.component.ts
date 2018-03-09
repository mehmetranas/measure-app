import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-customer-add',
  template: `
    <p>
      customer-add works!
    </p>
  `,
  styles: []
})
export class CustomerAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomerAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
