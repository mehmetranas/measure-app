import {ADD_ORDER, ADD_ORDER_LINE} from '../redux.actions';
import {tassign} from 'tassign';
import {OrderLineModel} from '../../models/order-line.model';

export interface IOrderState {
  id: number;
  orderlines: OrderLineModel[];
  customerId: number;
  orderStatus: number;
  orderDate: Date;
}

export const Order_Initial_State: IOrderState = {
  id: null,
  orderlines: [],
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
      });
    case ADD_ORDER_LINE:
      return tassign(state, {
        orderlines: state.orderlines.concat(action.orderline)
      });
  }
  return state;
}
