import {Component, Input, OnInit} from '@angular/core';
import {UPDATE_STEP} from '../../redux/redux.actions';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/stores/app.store';

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

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
  }

  public updateStep(value) {
    this.ngRedux.dispatch({type: UPDATE_STEP, value: value})
  }


}

