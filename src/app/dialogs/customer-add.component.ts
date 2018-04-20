import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerModel} from '../models/customer.model';

@Component({
  selector: 'app-customer-add',
  template: `
    <div class="container">
      <div class="row">
        <button mat-icon-button mat-dialog-close>
          <mat-icon>clear</mat-icon>
        </button>
      </div>
      <div class="row">
        <div class="col-md-12">
            <app-customer-form [customer]="customer" (customerFormEmit)="closeDialog($event)">
            </app-customer-form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CustomerAddComponent implements OnInit{

  public customer: CustomerModel = new CustomerModel(null);

  constructor(public dialogRef: MatDialogRef<CustomerAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    if(this.data && this.data.customer){
      this.customer = this.data.customer;
    }
  }

  public closeDialog(customer: CustomerModel) {
    this.dialogRef.close({
      customer:customer
    });
  }
}
