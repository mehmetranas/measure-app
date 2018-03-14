import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
   <app-login></app-login>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
