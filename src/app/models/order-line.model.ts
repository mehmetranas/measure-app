import {OrderModel} from './order.model';
import {ProductModel} from './product.model';
import {IOrderlineInProcess, IOrderlinesState} from '../redux/stores/orderline.store';

export class OrderLineModel implements IOrderlineInProcess{
  public id: number;
  public order: OrderModel = new OrderModel();
  public orderId: number;
  public product: ProductModel = new ProductModel();
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
  public fonType: number;
}
