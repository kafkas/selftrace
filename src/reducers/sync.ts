import {
  Action,
  NetworkAction,
  AuthStatusAction,
  ActionType,
} from '../actions';
import { AuthStatus, Progress, nilProgress } from '../data-types';

export interface ReduxSync {
  progress: Progress;
}

const INITIAL_STATE: ReduxSync = {
  progress: nilProgress(),
};

export default (state = INITIAL_STATE, action: Action): ReduxSync => {
  switch (action.type) {
    case ActionType.REQUEST_SYNC:
      return { ...state, progress: (action as NetworkAction).progress };
    case ActionType.SET_AUTH_STATUS: {
      switch ((action as AuthStatusAction).payload.status) {
        case AuthStatus.SignedOut:
          return { ...state, progress: nilProgress() };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
