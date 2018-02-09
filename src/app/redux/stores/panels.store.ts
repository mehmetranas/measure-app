import {ADD_ORDER, SET_PANEL_STATE} from '../redux.actions';
import {tassign} from 'tassign';

export interface IPanelsState {
  statusOfClosed:{
    panelMeasure: boolean,
    panelDynamic: boolean
  }
}

export const Panels_Initial_State: IPanelsState = {
  statusOfClosed:{
    panelMeasure: null,
    panelDynamic: null
  }
};

export function panelsReducer(state: IPanelsState = Panels_Initial_State, action): IPanelsState{
  switch (action.type){
    case SET_PANEL_STATE:
      return tassign(state, {
        statusOfClosed:action.statusOfClosed
      });
  }
  return state;
}
