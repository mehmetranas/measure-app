import {OrderModel} from '../../models/order.model';
import {ADD_ORDER_LINE, RESET_ORDER_LINE, RESET_ORDER_LINES, UPDATE_ORDER_LINE} from '../redux.actions';
import {tassign} from 'tassign';
import {ProductModel} from '../../models/product.model';
import {OrderLineModel} from '../../models/order-line.model';

export interface IOrderlineInProcess{
  id: number,
  order: OrderModel,
  product: ProductModel,
  lineDescription: string,
  propertyWidth: number,
  propertyHeight: number,
  propertyAlternativeWidth: number,
  propertyAlternativeHeight: number,
  sizeOfPile: number,
  unitPrice: number,
  lineAmount: number,
  isSkirtSliced: boolean,
  propertyLeftWidth: number,
  propertyRightWidth: number,
  skirtNo: string,
  isBeaded: boolean,
  beadNo: string,
  mountType: number,
  pileName: string,
  piecesCount: number,
  usedMaterial: number,
  propertyModelName: string,
  direction: number,
  locationName: number,
  mechanismStatus: number,
  locationType: string,
  fontType: number
}

export interface IOrderlinesState{
  orderlines: IOrderlineInProcess[];
}

export const Orderlines_Initial_State: IOrderlinesState = {orderlines:[]};

export const OrdelineInProcess_Initial_State: IOrderlineInProcess = new OrderLineModel();

export function  orderlinesReducer(state: IOrderlinesState = Orderlines_Initial_State, action): IOrderlinesState {
  switch (action.type){
    case ADD_ORDER_LINE:
      const orderline = {...action.orderline,product:{...action.orderline.product},order:{...action.orderline.order}};
      return tassign(state, {orderlines: state.orderlines.concat(orderline)});
    case RESET_ORDER_LINES:
      return tassign(state,{orderlines:[]})
  }

  return state;
}

export function orderlineInProcessReducer(
  state: IOrderlineInProcess = OrdelineInProcess_Initial_State,
  action): IOrderlineInProcess{
  switch (action.type){
    case UPDATE_ORDER_LINE:
      return tassign(state, action.orderline);
    case RESET_ORDER_LINE:
      return OrdelineInProcess_Initial_State;
  }
  return state;
}
