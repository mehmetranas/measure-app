import {ADD_ORDER} from '../redux.actions';
import {tassign} from 'tassign';

export interface IOrderState {
  id: number;
  customerId: number;
  orderStatus: number;
  orderDate: Date;
}

export const Order_Initial_State: IOrderState = {
  id: null,
  customerId: null,
  orderStatus: null,
  orderDate: null
};

export function orderReducer(state: IOrderState = Order_Initial_State, action): IOrderState{
  switch (action.type){
    case ADD_ORDER:
      return tassign(state, {
        id: action.order.id,
        customerId: action.order.customerId,
        orderDate: action.order.orderDate
      })
  }
  return state;
}