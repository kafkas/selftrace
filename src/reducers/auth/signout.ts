import { Action, NetworkAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

export interface ReduxAuthSignout {
  progress: Progress;
}

export const signout = (
  state: ReduxAuthSignout,
  action: Action
): ReduxAuthSignout => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNOUT:
      return { ...state, progress: (action as NetworkAction).progress };
    default:
      return state;
  }
};
