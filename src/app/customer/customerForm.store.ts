import {tassign} from 'tassign';

import {ADD} from '../redux.actions';

export interface ICustomerFormState {
  id;
  nameSurname;
  mobilePhone;
  fixedPhone;
  address;
  newsletterAccepted;
}

export const Customer_Form_Initial_State: ICustomerFormState = {
  id:'',
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
        nameSurname: action.customer.name,
        mobilePhone: action.customer.mobilTel,
        fixedPhone: action.customer.fixedTel,
        address: action.customer.address,
        newsletterAccepted: action.customer.isTrackingCampaign
      });
  }

  return state;
}
