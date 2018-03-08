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
          id: action.customerFormEmit.customer.id,
          nameSurname: action.customerFormEmit.customer.nameSurname,
          mobilePhone: action.customerFormEmit.customer.mobilePhone,
          fixedPhone: action.customerFormEmit.customer.fixedPhone,
          address: action.customerFormEmit.customer.address,
          newsletterAccepted: action.customerFormEmit.customer.newsletterAccepted
        },
        isToBeMeasure:action.customerFormEmit.isToBeMeasure
      });
    case RESET_CUSTOMER_FORM:
      return tassign(state, {customer:new CustomerModel(null),isToBeMeasure:false})
  }

  return state;
}
