import {OrderModel} from './order.model';
import {ProductModel} from './product.model';

export class OrderLineModel {
  public id: number;
  public order: OrderModel = new OrderModel();
  public product: ProductModel = new ProductModel();
  public lineDescription: string;
  public propertyWidth: number;
  public propertyHeight: number;
  public propertyAltertativeWidh: number;
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
  public isCornice: boolean;
  public isRustic: boolean;
  public pileName: string;
  public piecesNumber: number;
  public usedMaterial: number;
  public propertyModelName: string;

  public locationType;
  public direction;
  public locationName;
  public mechanismStatus;
  public fonType;
}
