import {OrderModel} from '../../models/order.model';
import {UPDATE_ORDER_LINE} from '../redux.actions';
import {tassign} from 'tassign';
import {Order_Initial_State} from './order.store';

export interface IOrderlineState{
  id: number,
  order: OrderModel,
  product: any,
  lineDescription: string,
  propertyWidh: number,
  propertyHeight: number,
  propertyAltertativeWidh: number,
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
  isCornice: boolean,
  isRustic: boolean,
  pileName: string,
  piecesNumber: number,
  usedMaterial: number,
  propertyModelName: string,
  direction: string,
  locationName: string,
  mechanismStatus: string,
  locationType: string,
  fonType: string,
}

export const Orderline_Initial_State: IOrderlineState = null;

export function  orderlineReducer(state: IOrderlineState = Orderline_Initial_State, action): IOrderlineState {
  switch (action.type){
    case UPDATE_ORDER_LINE:
      return tassign(state, action.orderline)
  }

  return state;
}
