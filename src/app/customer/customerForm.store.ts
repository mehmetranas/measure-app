import {Action} from 'redux';
import {ADD} from '../sidenav/customerForm.actions';
import {tassign} from 'tassign';

export interface ICustomerFormState {
  name: string;
  mobilTel: string;
  fixedTel: string;
  address: string;
  isTrackingCampaign: boolean;
}

export const Customer_Form_Initial_State: ICustomerFormState = {
  name: '',
  mobilTel: '',
  fixedTel: '',
  address: '',
  isTrackingCampaign: false
};

export function customerFormReducer(state: ICustomerFormState = Customer_Form_Initial_State, action): ICustomerFormState {
  switch (action.type) {
    case ADD:
      return tassign(state, {
        name: action.data.name,
        mobilTel: action.data.mobilTel,
        fixedTel: action.data.fixedTel,
        address: action.data.address,
        isTrackingCampaign: action.data.isTrackingCampaign
      });
  }

  return state;
}
