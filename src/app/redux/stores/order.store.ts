import {ADD_ORDER, RESET_ORDER, UPDATE_ORDER_TOTAL_AMOUNT} from '../redux.actions';
import {tassign} from 'tassign';
import {CustomerModel} from '../../models/customer.model';

export interface IOrderState {
  id: number;
  customer:CustomerModel;
  orderStatus: number;
  orderDate: Date;
  totalAmount: number;
  deliveryDate:Date;
  mountDate:Date;
  measureDate: Date;
  userName:string;
}

export const Order_Initial_State: IOrderState = {
  id: null,
  customer: null,
  orderStatus: null,
  orderDate: null,
  totalAmount: null,
  deliveryDate:null,
  mountDate:null,
  measureDate:null,
  userName:null
};

export function orderReducer(state: IOrderState = Order_Initial_State, action): IOrderState{
  switch (action.type){
    case ADD_ORDER:
      return tassign(state, action.order);
    case UPDATE_ORDER_TOTAL_AMOUNT:
      return tassign(state, {
        totalAmount: action.totalAmount
      });
    case RESET_ORDER:
      return tassign(state, Order_Initial_State);
  }
  return state;
}
