
export interface IAppState {
}
export interface ISidenavState {
  isDisplay: boolean;
}

export function rootReducer(state, action) {
  return state;
}

export function sideNavReducer(state: ISidenavState, action): ISidenavState {
  return { isDisplay: !state.isDisplay };
}
