import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerModel} from '../models/customer.model';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-customer-detail',
  template: `
    <app-view-customer [customer]="customer"></app-view-customer>
    <app-orders [customerId]="customerId"></app-orders>
  `,
  styles: []
})
export class CustomerDetailComponent implements OnInit {
  public customerId: number;
  public customer: CustomerModel = new CustomerModel(null);
  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params["id"];
  }

}
