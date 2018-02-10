import {combineReducers} from 'redux';
import {ISidenavState, Sidenav_Initial_State, sidenavReducer} from './sidenav.store';
import {Customer_Form_Initial_State, customerFormReducer, ICustomerFormState} from './customerForm.store';
import {IUserState, User_Initial_State, userReducer} from './user.store';
import {IOrderState, Order_Initial_State, orderReducer} from './order.store';
import {
  IOrdelineInProcess,
  IOrderlinesState,
  orderlinesReducer,
  orderlineInProcessReducer,
  OrdelineInProcess_Initial_State, Orderlines_Initial_State
} from './orderline.store';
import {IStepperState, Stepper_Initial_State, stepperReducer} from './stepper.store';
import {IPanelsState, Panels_Initial_State, panelsReducer} from './panels.store';
import {IOrderlineFormState, OrderlineForm_Initial_State, orderlineFormReducer} from './orderlineForm.state';

export interface IAppState {
  sidenav: ISidenavState;
  customerForm: ICustomerFormState;
  user: IUserState;
  order: IOrderState;
  orderlines: IOrderlinesState;
  orderlineInProcess: IOrdelineInProcess,
  stepper: IStepperState;
  panels: IPanelsState;
  orderlineForm: IOrderlineFormState
}

export const Initial_States: IAppState = {
  sidenav: Sidenav_Initial_State,
  customerForm: Customer_Form_Initial_State,
  user: User_Initial_State,
  order: Order_Initial_State,
  orderlines: Orderlines_Initial_State,
  orderlineInProcess: OrdelineInProcess_Initial_State,
  stepper: Stepper_Initial_State,
  panels: Panels_Initial_State,
  orderlineForm: OrderlineForm_Initial_State
};

export const rootReducer = combineReducers<IAppState>({
  sidenav: sidenavReducer,
  customerForm: customerFormReducer,
  user: userReducer,
  order: orderReducer,
  orderlines: orderlinesReducer,
  orderlineInProcess: orderlineInProcessReducer,
  stepper: stepperReducer,
  panels: panelsReducer,
  orderlineForm: orderlineFormReducer
});



