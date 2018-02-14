import {tassign} from 'tassign';
import {ADD_ORDER_LINE_PROPERTIES} from '../redux.actions';

export interface IOrderlinesPropertiesState {
  orderlinesProperties: any[];
}

export const OrderlineProperties_Initial_State: IOrderlinesPropertiesState = {
  orderlinesProperties:[]
};

export function orderlinesPropertiesReducer(state: IOrderlinesPropertiesState = OrderlineProperties_Initial_State, action): IOrderlinesPropertiesState {
  switch (action.type) {
    case ADD_ORDER_LINE_PROPERTIES:
      return tassign(state, {orderlinesProperties: state.orderlinesProperties.concat(action.orderlineProperties)});
  }

  return state;
}
