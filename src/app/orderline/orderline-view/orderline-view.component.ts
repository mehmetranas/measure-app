import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {directions, fontTypes, mechanismTypes, products} from '../../helpers';

@Component({
  selector: 'app-orderline-view',
  templateUrl: './orderline-view.component.html',
  styleUrls: ['./orderline-view.component.css']
})
export class OrderlineViewComponent implements OnInit {
  @Output() deleteEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() editEmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() orderline;
  @Input() isTailor = false;
  @Input() orderlineProperties: any = {};
  public alertDeleteDisplay = false;
  public fonTypes: any;
  public products: any;
  public directions: any;
  public mechanismTypes: any;
  constructor() { }

  ngOnInit() {
    this.fonTypes = fontTypes;
    this.products = products;
    this.directions = directions;
    this.mechanismTypes = mechanismTypes;
  }
}
