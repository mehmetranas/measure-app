import {OrderDetailModel} from './order.model';
import {ProductDetailModel} from './product.model';

export class OrderLineModel {
  public id: number;
  public order: OrderDetailModel = new OrderDetailModel();
  public productDetailModel: ProductDetailModel = new ProductDetailModel();
  public lineDescription: string;
  public propertyWidth: number;
  public propertyHeight: number;
  public propertyAlternativeWidth: number;
  public propertyAlternativeHeight: number;
  public sizeOfPile: number;
  public unitPrice: number;
  public lineAmount: number;
  public isSkirtSliced: boolean;
  public propertyLeftWidth: number;
  public propertyRightWidth: number;
  public skirtNo: string;
  public isBeaded: boolean;
  public beadNo: string;
  public mountType: number;
  public pileName: string;
  public piecesCount: number;
  public usedMaterial: number;
  public propertyModelName: string;

  public locationType: string;
  public direction: number;
  public locationName: number;
  public mechanismStatus: number;
  public fontType: number;
}
