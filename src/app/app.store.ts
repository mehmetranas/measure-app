import {combineReducers} from 'redux';
import {ISidenavState, Sidenav_Initial_State, sidenavReducer} from './sidenav/sidenav.store';
import {Customer_Form_Initial_State, customerFormReducer, ICustomerFormState} from './customer/customerForm.store';

export interface IAppState {
  sidenav: ISidenavState;
  customerForm: ICustomerFormState;
}


export const Initial_States: IAppState = {
  sidenav: Sidenav_Initial_State,
  customerForm: Customer_Form_Initial_State
};

export const rootReducer = combineReducers<IAppState>({
  sidenav: sidenavReducer,
  customerForm: customerFormReducer
});



