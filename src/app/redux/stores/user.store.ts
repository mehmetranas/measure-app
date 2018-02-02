import {tassign} from 'tassign';
import {ADD_USER} from '../redux.actions';

export interface IUserState {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export const User_Initial_State: IUserState = {
  id: null,
  username: '',
  email: '',
  password: '',
  phone: ''
};

export function userReducer(state: IUserState = User_Initial_State, action): IUserState {
  switch (action.type) {
    case ADD_USER:
      return tassign(state, {
        id: action.user.id,
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        phone: action.user.phone
      });
  }

  return state;
}
