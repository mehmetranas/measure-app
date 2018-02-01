import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private products = [
    {value:'TP',viewValue:'Tül Perde'},
    {value:'GP',viewValue:'Güneşlik'},
    {value:'SP',viewValue:'Stor Perde'},
    {value:'ZP',viewValue:'Zebra Perde'},
    {value:'JP',viewValue:'Jaluzi'},
    {value:'DP',viewValue:'Dikey Perde'},
    {value:'KTP',viewValue:'Kruvaze Tül'},
    {value:'BP',viewValue:'Briz'},
    {value:'FARBP',viewValue:'Farbella'},
    {value:'FP',viewValue:'Fon Perde'}
    ];

  constructor() { }

  public get(){
    return this.products;
  }
}
