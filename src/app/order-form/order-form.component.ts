import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  public isCustomerFormDisplay = true;
  public isCustomerCardDisplay = false;
  constructor() { }

  ngOnInit() {
  }

  displayActions($event: boolean) {
    this.isCustomerFormDisplay = $event;
    this.isCustomerCardDisplay = !$event;
  }
}
