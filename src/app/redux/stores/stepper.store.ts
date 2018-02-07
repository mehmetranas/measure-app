import {tassign} from 'tassign';
import {SET_STEP, UPDATE_STEP} from '../redux.actions';

export interface IStepperState {
 count: number
}

export const Stepper_Initial_State: IStepperState = {
  count: 0
};

export function stepperReducer(state: IStepperState = Stepper_Initial_State, action): IStepperState {
  switch (action.type) {
    case UPDATE_STEP:
      return tassign(state, {count: state.count + action.value});
    case SET_STEP:
      return tassign(state, {count: action.value});
  }

  return state;
}
