import { Component, OnInit } from '@angular/core';
import {CustomerModel} from '../models/customer.model';
import {CustomerService} from './customer.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {isPending} from 'q';

@Component({
  selector: 'app-add-customer',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-3">
          <mat-card>
            <mat-card-subtitle class="text-center">
              Yeni Müşteri
            </mat-card-subtitle>
            <mat-card-content>
              <ng-container *ngIf="isPending">
                <mat-progress-bar  mode="indeterminate"></mat-progress-bar>
                <br>
              </ng-container>
              <div class="row">
                <div class="col-md-8 offset-2">
                  <app-customer-form (customerFormEmit)="saveCustomer($event)"></app-customer-form>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AddCustomerComponent {
  public isPending = false;
  constructor(private customerService: CustomerService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  public saveCustomer(customer: CustomerModel){
    this.isPending = true;
    this.customerService.add(customer,null)
      .finally(() => this.isPending = false)
      .subscribe((response:any) => {
          this.snackBar.open("Yeni müşteri ekleme:","Başarılı",{
            duration:2200
          });
          this.router.navigateByUrl("/user/order-form/" + response.id);
        },
        (err: any) => console.log(err));
  }
}
