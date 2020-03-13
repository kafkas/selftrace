import { Action, NetworkAction, ActionType } from '../../actions';
import { Progress, nilProgress } from '../../data-types';

export interface ReduxAuthSignup {
  progress: Progress;
}

export const signup = (
  state: ReduxAuthSignup,
  action: Action
): ReduxAuthSignup => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNUP:
      return { ...state, progress: (action as NetworkAction).progress };
    case ActionType.REQUEST_SIGNIN:
      return { ...state, progress: nilProgress() };
    default:
      return state;
  }
};
