import {OrderDetailModel} from '../../models/order.model';
import {ADD_ORDER_LINE, UPDATE_ORDER_LINE} from '../redux.actions';
import {tassign} from 'tassign';

export interface IOrdelineInProcess{
  id: number,
  order: OrderDetailModel,
  product: any,
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
  orderlines: IOrdelineInProcess[];
}

export const Orderlines_Initial_State: IOrderlinesState = {orderlines:[]};
export const OrdelineInProcess_Initial_State: IOrdelineInProcess = null;

export function  orderlinesReducer(state: IOrderlinesState = Orderlines_Initial_State, action): IOrderlinesState {
  switch (action.type){
    case ADD_ORDER_LINE:
      return tassign(state, {orderlines: state.orderlines.concat(action.orderlines)});
  }

  return state;
}

export function orderlineInProcessReducer(state: IOrdelineInProcess = OrdelineInProcess_Initial_State, action): IOrdelineInProcess{
  switch (action.type){
    case UPDATE_ORDER_LINE:
      return tassign(state, action.orderline)
  }
  return state;
}
