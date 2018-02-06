import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-order-line',
  templateUrl: './dynamic-order-line.component.html',
  styleUrls: ['./dynamic-order-line.component.css']
})
export class DynamicOrderLineComponent implements OnInit {
  @Input() locationTypeByProperties: any = {};
  public isSkirtSelected = false;
  public isBeadSelected = false ;

  public piles = [
    {value:'Amerikan Pile', viewValue:'Amerikan Pile'},
    {value:'Kanun Pile', viewValue:'Kanun Pile'},
    {value:'Yan Pile', viewValue:'Yan Pile'},
    {value:'Diğer', viewValue:'Diğer'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
