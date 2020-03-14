import { Action as ReduxAction } from 'redux';
import { ReduxAuthStatus, ReduxAuthUserInfo } from '../reducers';
import { Progress } from '../data-types';

export { ActionCreator, Dispatch } from 'redux';
export { ThunkAction, ThunkDispatch } from 'redux-thunk';

export enum ActionType {
  // Auth
  SET_AUTH_STATUS,
  REQUEST_SIGNUP,
  REQUEST_SIGNIN,
  REQUEST_SIGNOUT,
  REQUEST_UPDATE_PASSWORD,
  REQUEST_RESET_PASSWORD,
  REQUEST_UPDATE_USER_INFO,
}

/*
 * Commonly used actions
 */

export interface Action extends ReduxAction<ActionType> {
  payload?: object | string | boolean | number;
}

export interface NetworkAction extends Action {
  progress: Progress;
}

export interface AuthStatusAction extends Action {
  payload: {
    status: ReduxAuthStatus;
    userInfo?: ReduxAuthUserInfo;
  };
}
