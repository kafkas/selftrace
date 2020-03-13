import { requestSignup } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus } from '../../data-types';

const startSignupRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: {
    message: 'Requesting signup...',
    status: ProgressStatus.REQUEST,
  },
});

const receiveSignupResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: {
    message: 'Signup successful.',
    status: ProgressStatus.SUCCESS,
  },
});

const receiveSignupError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearSignupProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

export const signupUser = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  dispatch(startSignupRequest({ email, password }));

  try {
    const { user } = await requestSignup(email, password);

    return dispatch(receiveSignupResponse(user));
  } catch (err) {
    return dispatch(receiveSignupError(err));
  }
};
