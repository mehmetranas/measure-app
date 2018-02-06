import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private products = [
    {value: 0,viewValue:'Tül Perde'},
    {value: 1,viewValue:'Güneşlik'},
    {value: 2 ,viewValue:'Stor Perde'},
    {value: 3,viewValue:'Zebra Perde'},
    {value: 4,viewValue:'Jaluzi'},
    {value: 5,viewValue:'Dikey Perde'},
    {value: 6,viewValue:'Kruvaze Tül'},
    {value: 7,viewValue:'Briz'},
    {value: 8,viewValue:'Farbella'},
    {value: 9,viewValue:'Fon Perde'},
    {value: 10,viewValue:'Tül Store Perde'}
    ];

  constructor() { }

  public get(){
    return this.products;
  }
}
