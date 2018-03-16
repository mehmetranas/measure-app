import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerModel} from '../models/customer.model';
import {CustomerService} from '../customer/customer.service';
import {OrderModel} from '../models/order.model';
import {Router} from '@angular/router';
import {OrderService} from '../order-form/order.service';

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
          <ng-container *ngIf="!data?.isView;else viewComponent">
            <app-customer-form [customer]="customer" (customerFormEmit)="pushCustomer($event)">
            </app-customer-form>
          </ng-container>
          <ng-template #viewComponent>
            <app-view-customer [customer]="customer"></app-view-customer>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CustomerAddComponent implements OnInit{

  public customer: CustomerModel = new CustomerModel(null);

  constructor(public dialogRef: MatDialogRef<CustomerAddComponent>,
              private customerService: CustomerService,
              private orderService: OrderService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    if(this.data && this.data.customer){
      this.customer = this.data.customer;
    }
  }
  public pushCustomer(customer: CustomerModel){
    this.customerService.add(customer,null)
      .subscribe((response:any) => {
        this.closeDialog(response.id);
      },
        (err: any) => console.log(err));
  }

  private closeDialog(id: number) {
    this.dialogRef.close({
      id:id
    });
  }
}
