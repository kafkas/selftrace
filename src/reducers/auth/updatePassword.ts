import { Action, NetworkAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

export interface ReduxAuthUpdatePassword {
  progress: Progress;
}

export const updatePassword = (
  state: ReduxAuthUpdatePassword,
  action: Action
): ReduxAuthUpdatePassword => {
  switch (action.type) {
    case ActionType.REQUEST_UPDATE_PASSWORD:
      return { ...state, progress: (action as NetworkAction).progress };
    default:
      return state;
  }
};
