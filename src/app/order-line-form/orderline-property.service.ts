import { Injectable } from '@angular/core';

@Injectable()
export class OrderlinePropertyService {

  private CommonOptions = {
    name: '',
    pileName: false,
    width: true,
    height: true,
    altWidthAndHeight: false,
    sizeOfPile: false,
    unitOfPrice: true,
    lineAmount: true,
    skirtAndBeadOptions: false,
    isCornice: true,
    isRustic: false,
    direction: false,
    locationName: true,
    locationType: true,
    fontType: false,
    propertyModelName: false,
    propertyLeftRightWidth: false,
    mechanismStatusAndPieceCount: false,
    mechanismPeace:0,
    mechanismType: null
  };

  private Details = [
    {
      name :'Tül',
      sizeOfPile : true
    },
    {
      name: 'Güneşlik'
    },
    {
      name : 'Stor',
      skirtAndBeadOptions : true,
      direction : true,
      mechanismStatusAndPieceCount : true,
    },
    {
      name : 'Zebra',
      skirtAndBeadOptions : true,
      direction : true,
      mechanismStatusAndPieceCount : true
    },
    {
      name : 'Jaluzi',
      direction : true
    },
    {
      name : 'Dikey',
      direction : true
    },
    {
      name : 'Kruvaze',
      sizeOfPile : true,
      propertyLeftRightWidth : true
    },
    {
      name : 'Bris',
      altWidthAndHeight : true,
      sizeOfPile : true
    },
    {
      name : 'Farbella',
      propertyModelName : true
    },
    {
      name : 'Fon',
      pileName : true,
      sizeOfPile : true,
      fontType : true
    },
    {
      name : 'Tül Stor',
      skirtAndBeadOptions : true,
      direction : true,
      mechanismStatusAndPieceCount : true
    }
  ];

  constructor() { }

  public getProductOption(index){
    return Object.assign({}, this.CommonOptions, this.Details[index]);
  }
}
