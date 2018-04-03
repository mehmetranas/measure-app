import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
<div class="main-body">
  <div class="container app-main mat-elevation-z20">
      <div class="row">
        <div class="col-md-12">
            <div class="row">
              <div class="col-md-6 app-register">
                <app-login></app-login>
              </div>
              <div class="col-md-6 app-login">
                <app-registration></app-registration>
              </div>
            </div>    
         </div>
      </div>
    </div>
</div>
  `,
  styles: [`
    .main-body{
      height: 100vh;
      width: 100vw;
      background: linear-gradient(to right, #ff084c,deeppink);
      overflow: auto;
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
  `]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
