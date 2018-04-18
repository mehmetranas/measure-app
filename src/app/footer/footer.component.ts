import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <mat-toolbar class="footer">Footer</mat-toolbar>
  `,
  styles: [`
    .footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #c5caff;
    }
  `]
})
export class FooterComponent {

  constructor() { }

}
