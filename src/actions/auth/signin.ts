import { requestSignin } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus } from '../../data-types';

const startSigninRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: {
    message: 'Requesting signin...',
    status: ProgressStatus.REQUEST,
  },
});

const receiveSigninResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: {
    message: 'Signin successful.',
    status: ProgressStatus.SUCCESS,
  },
});

const receiveSigninError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearSigninProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

export const signinUser = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch(startSigninRequest({ email, password }));

  try {
    const res = await requestSignin(email, password);
    return dispatch(receiveSigninResponse(res));
  } catch (err) {
    return dispatch(receiveSigninError(err));
  }
};
