import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-orderline-view',
  templateUrl: './orderline-view.component.html',
  styles: [`
  .mat-accent{
    background-color: #ffc107;  
    color: black;
  }
    .button-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  `]
})
export class OrderlineViewComponent implements OnInit {
  @Output() editEmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() orderline;
  @Input() orderlineProperties: any = {};
  constructor() { }

  ngOnInit() {
  }

}
