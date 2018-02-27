import {tassign} from 'tassign';

import {ADD_CUSTOMER, RESET_CUSTOMER_FORM} from '../redux.actions';
import {CustomerModel} from '../../models/customer.model';

export interface ICustomerFormState {
  customer:CustomerModel
  isToBeMeasure:boolean
}

export const Customer_Form_Initial_State: ICustomerFormState = {
  customer:new CustomerModel(null),
  isToBeMeasure:false
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
        isToBeMeasure:action.customerForm.isToBeMeasure
      });
    case RESET_CUSTOMER_FORM:
      return tassign(state, {customer:new CustomerModel(null),isToBeMeasure:false})
  }

  return state;
}
