import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationService} from '../../order-form/location.service';
import {ProductService} from '../../order-form/product.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.css']
})
export class MeasureFormComponent implements OnInit {
  @Output() stepper= new EventEmitter<number>();
  public locations = [];
  public products = [];

  constructor(private locationService: LocationService, private productService: ProductService) { }

  ngOnInit() {
    this.locations = this.locationService.get();
    this.products = this.productService.get();
  }

  public postMeasureForm(measureForm: NgForm) {
  }
}
