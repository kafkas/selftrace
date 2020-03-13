import { Action, NetworkAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

export interface ReduxAuthResetPassword {
  progress: Progress;
}

export const resetPassword = (
  state: ReduxAuthResetPassword,
  action: Action
): ReduxAuthResetPassword => {
  switch (action.type) {
    case ActionType.REQUEST_RESET_PASSWORD:
      return { ...state, progress: (action as NetworkAction).progress };
    default:
      return state;
  }
};
