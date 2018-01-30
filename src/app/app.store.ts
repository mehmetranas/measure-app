import {combineReducers} from 'redux';
import {ISidenavState, Sidenav_Initial_State, sidenavReducer} from './sidenav/sidenav.store';

export interface IAppState {
  sidenav: ISidenavState;
}

export const Initial_States: IAppState = {
  sidenav: Sidenav_Initial_State
};

export const rootReducer = combineReducers<IAppState>({
  sidenav: sidenavReducer
});



