import {UPDATE_ORDER_LINE_FORM} from '../redux.actions';
import {tassign} from 'tassign';

export interface IOrderlineFormState{
  isValid: boolean;
  isSubmit:boolean;
}

export const OrderlineForm_Initial_State = {
  isValid: false,
  isSubmit: false
};

export function orderlineFormReducer(state: IOrderlineFormState = OrderlineForm_Initial_State, action): IOrderlineFormState{
  switch (action.type){
    case UPDATE_ORDER_LINE_FORM:
      return tassign(state, action.form)
  }
  return state
}
