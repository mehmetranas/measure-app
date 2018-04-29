import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-login',
  template: `
    <p>
      super-login works!
      <a routerLink="/super/tenants">Go To Tenants</a>
      <br>
      <a routerLink="/super">Go To Main</a>
    </p>
  `,
  styles: []
})
export class SuperLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
