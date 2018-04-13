import { Component, OnInit } from '@angular/core';
import {MAT_LABEL_GLOBAL_OPTIONS} from "@angular/material";

@Component({
  selector: 'app-search-bar',
  template: `
   <div>
     <form>
       <mat-icon matPrefix>search</mat-icon>
       <input class="search-bar" type="text" placeholder="Sipariş Numarası">
     </form>
   </div> 
  `,
  styles: [`
    .search-bar{
      width: 50vw;
      border: 1px solid #eee;
      text-indent: 35px;
      font-size: 1rem;
      line-height: 2.75rem;
    }
    .mat-icon{
      position: absolute;
      top: 30%;
      left: 65px;
      color: rgba(0,0,0,.87);
    }
  `],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}}
  ]
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
