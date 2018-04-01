import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="container app-main mat-elevation-z20">
      <div class="row">
        <div class="col-md-12">
            <div class="row">
              <div class="col-md-6 app-register">
                <app-login></app-login>
              </div>
              <div class="col-md-6 app-login">1</div>
            </div>    
         </div>
      </div>
    </div>
  `,
  styles: [`
    html,body {
      height: 100%;
      background: linear-gradient(to right, #ff084c,deeppink);
    }
    @media  (min-width: 768px) {
      .app-main{
        margin-top: 10%;
      }
    }
    .app-register{
      height: 350px;
      background-color: white;
    }
    .app-login{
      height: 350px;
      background-color: #530972;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
