import {tassign} from 'tassign';

import {ADD_CUSTOMER, RESET_CUSTOMER} from '../redux.actions';
import {sourceInfo} from '@angular/compiler-cli/src/metadata/evaluator';

export interface ICustomerFormState {
  customer: {
    id: number;
    nameSurname: string;
    mobilePhone: string;
    fixedPhone: string;
    address: string;
    newsletterAccepted: boolean;
  },
  isToBeMeasured:boolean
}

export const Customer_Form_Initial_State: ICustomerFormState = {
  customer:{
    id: null,
    nameSurname: '',
    mobilePhone: '',
    fixedPhone: '',
    address: '',
    newsletterAccepted: false
  },
  isToBeMeasured:false

};

export function customerFormReducer(state: ICustomerFormState = Customer_Form_Initial_State, action): ICustomerFormState {
  switch (action.type) {
    case ADD_CUSTOMER:
      return tassign(state, {
        customer:{
          id: action.customerForm.customer.id,
          nameSurname: action.customerForm.customer.nameSurname,
          mobilePhone: action.customerForm.customer.mobilePhone,
          fixedPhone: action.customerForm.customer.fixedPhone,
          address: action.customerForm.customer.address,
          newsletterAccepted: action.customerForm.customer.newsletterAccepted
        },
        isToBeMeasured:action.customerForm.isToBeMeasured
      });
    case RESET_CUSTOMER:
      return tassign(state, Customer_Form_Initial_State)
  }

  return state;
}
