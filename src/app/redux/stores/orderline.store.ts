import {OrderDetailModel} from '../../models/order.model';
import {ADD_MECHANISM_INFO, UPDATE_ORDER_LINE} from '../redux.actions';
import {tassign} from 'tassign';

export interface IOrderlineState{
 orderline:{
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
 },
  orderlineForm:{
   isValid: boolean
  }
}

export const Orderline_Initial_State: IOrderlineState = {orderline:null,orderlineForm:{isValid:false}};

export function  orderlineReducer(state: IOrderlineState = Orderline_Initial_State, action): IOrderlineState {
  switch (action.type){
    case UPDATE_ORDER_LINE:
      return tassign(state, {
        orderline:action.orderline,
        orderlineForm:action.orderlineForm
      });
    case ADD_MECHANISM_INFO:
      return tassign(state, action.orderline); //delete if unused
  }

  return state;
}
