import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from './redux/stores/app.store';
import {ADD_ORDER_LINE} from './redux/redux.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private mockOrderline = {
    order: {
      orderTotalAmount: 1500,
      id: 23
    },
    product: {
      productValue: 0,
      patternCode: 'Desen',
      variantCode: 'Var',
      aliasName: 'Taç'
    },
    locationName: 2,
    locationType: 'Kapı 6',
    piecesCount: 0,
    mechanismStatus: 0,
    productValue: 0,
    propertyWidth: 500,
    propertyHeight: 250,
    mountType: 1,
    sizeOfPile: 2,
    lineDescription: 'Test',
    unitPrice: 3,
    lineAmount: 500,
    id: 5
  }

  constructor(private ngRedux: NgRedux<IAppState>){}

  ngOnInit(): void {
    this.ngRedux.dispatch({type:ADD_ORDER_LINE, orderline: this.mockOrderline})
  }
  title = 'app';
}
