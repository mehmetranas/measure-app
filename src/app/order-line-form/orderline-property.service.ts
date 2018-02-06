import { Injectable } from '@angular/core';

@Injectable()
export class OrderlinePropertyService {

  private CommonOptions = {
    id: null,
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
    propertyModel: false,
    propertyLeftRightWidth: false,
    mechanismStatusAndPieceCount: false,
  };

  private Details = [
    {
      id : 0,
      sizeOfPile : true
    },
    {
      id: 1
    },
    {
      id : 2,
      skirtAndBeadOptions : true,
      direction : true,
      mechanismStatusAndPieceCount : true
    },
    {
      id : 3,
      skirtAndBeadOptions : true,
      direction : true,
      mechanismStatusAndPieceCount : true
    },
    {
      id : 4,
      direction : true
    },
    {
      id : 5,
      direction : true
    },
    {
      id : 6,
      sizeOfPile : true,
      propertyLeftRightWidth : true
    },
    {
      id : 7,
      altWidthAndHeight : true,
      sizeOfPile : true
    },
    {
      id : 8,
      propertyModel : true
    },
    {
      id : 9,
      pileName : true,
      sizeOfPile : true,
      fontType : true
    },
    {
      id : 10,
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
