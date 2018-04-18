import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    ::ng-deep .app-snackbar .mat-simple-snackbar-action{
      color:#ffc107;
    }
  `]
})
export class AppComponent{

  constructor(){}
}
