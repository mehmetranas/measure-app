import {ADD_ORDER, UPDATE_ORDER_TOTAL_AMOUNT} from '../redux.actions';
import {tassign} from 'tassign';

export interface IOrderState {
  id: number;
  customerId: number;
  orderStatus: number;
  orderDate: Date;
  totalAmount: number;
}

export const Order_Initial_State: IOrderState = {
  id: null,
  customerId: null,
  orderStatus: null,
  orderDate: null,
  totalAmount: null
};

export function orderReducer(state: IOrderState = Order_Initial_State, action): IOrderState{
  switch (action.type){
    case ADD_ORDER:
      return tassign(state, {
        id: action.order.id,
        customerId: action.order.customerId,
        orderDate: action.order.orderDate
      });
    case UPDATE_ORDER_TOTAL_AMOUNT:
      return tassign(state, {
        totalAmount: action.totalAmount
      })
  }
  return state;
}
