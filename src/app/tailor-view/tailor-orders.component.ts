import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tailor-orders',
  template: `
    <app-orders [isTailor]="true" [paymentIconDisplay]="false"></app-orders>
  `,
  styles: []
})
export class TailorOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
