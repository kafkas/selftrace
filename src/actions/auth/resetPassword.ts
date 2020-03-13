import { requestResetPassword } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus } from '../../data-types';

const startResetPasswordRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: {
    message: 'Sending password reset request...',
    status: ProgressStatus.REQUEST,
  },
});

const receiveResetPasswordResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: {
    message:
      'Password reset request successful. Please check your email to proceed.',
    status: ProgressStatus.SUCCESS,
  },
});

const receiveResetPasswordError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearResetPasswordProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

export const resetUserPassword = (email: string) => async (
  dispatch: Dispatch
) => {
  dispatch(startResetPasswordRequest());

  try {
    const res = await requestResetPassword(email);
    return dispatch(receiveResetPasswordResponse(res));
  } catch (err) {
    return dispatch(receiveResetPasswordError(err));
  }
};
