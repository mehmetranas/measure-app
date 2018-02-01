export interface ISidenavState {
  isDisplay: boolean;
}
export const Sidenav_Initial_State: ISidenavState = {
  isDisplay: true
};
export function sidenavReducer(state: ISidenavState = Sidenav_Initial_State, action): ISidenavState {
  if (action.type === 'HIDE_SIDENAV') {
    return { isDisplay: !state.isDisplay };
  }
  return state;
}
