import {tassign} from 'tassign';

import {ADD} from '../redux.actions';

export interface ICustomerFormState {
  id: number;
  nameSurname: string;
  mobilePhone: string;
  fixedPhone: string;
  address: string;
  newsletterAccepted: boolean;
}

export const Customer_Form_Initial_State: ICustomerFormState = {
  id: null,
  nameSurname: '',
  mobilePhone: '',
  fixedPhone: '',
  address: '',
  newsletterAccepted: false
};

export function customerFormReducer(state: ICustomerFormState = Customer_Form_Initial_State, action): ICustomerFormState {
  switch (action.type) {
    case ADD:
      return tassign(state, {
        id: action.customer.id,
        nameSurname: action.customer.nameSurname,
        mobilePhone: action.customer.mobilePhone,
        fixedPhone: action.customer.fixedPhone,
        address: action.customer.address,
        newsletterAccepted: action.customer.newsletterAccepted
      });
  }

  return state;
}
