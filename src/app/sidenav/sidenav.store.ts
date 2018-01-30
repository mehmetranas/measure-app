export interface ISidenavState {
  isDisplay: boolean;
}
export const Sidenav_Initial_State: ISidenavState = {
  isDisplay: false
};
export function sidenavReducer(state: ISidenavState = Sidenav_Initial_State, action): ISidenavState {
  return { isDisplay: !state.isDisplay };
}
