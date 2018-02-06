import {combineReducers} from 'redux';
import {ISidenavState, Sidenav_Initial_State, sidenavReducer} from './sidenav.store';
import {Customer_Form_Initial_State, customerFormReducer, ICustomerFormState} from './customerForm.store';
import {IUserState, User_Initial_State, userReducer} from './user.store';
import {IOrderState, Order_Initial_State, orderReducer} from './order.store';
import {IOrderlineState, Orderline_Initial_State, orderlineReducer} from './orderline.store';

export interface IAppState {
  sidenav: ISidenavState;
  customerForm: ICustomerFormState;
  user: IUserState;
  order: IOrderState;
  orderline: IOrderlineState
}

export const Initial_States: IAppState = {
  sidenav: Sidenav_Initial_State,
  customerForm: Customer_Form_Initial_State,
  user: User_Initial_State,
  order: Order_Initial_State,
  orderline: Orderline_Initial_State
};

export const rootReducer = combineReducers<IAppState>({
  sidenav: sidenavReducer,
  customerForm: customerFormReducer,
  user: userReducer,
  order: orderReducer,
  orderline: orderlineReducer
});



