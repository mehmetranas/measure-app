import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <app-super-toolbar></app-super-toolbar>
    <div class="mt-5">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
