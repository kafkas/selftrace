import { requestUpdatePassword } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus } from '../../data-types';

const startUpdatePasswordRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: {
    message: 'Sending password update request...',
    status: ProgressStatus.REQUEST,
  },
});

const receiveUpdatePasswordResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: {
    message: 'Password update successful.',
    status: ProgressStatus.SUCCESS,
  },
});

const receiveUpdatePasswordError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearUpdatePasswordProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_PASSWORD,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

export const updateUserPassword = (newPassword: string) => async (
  dispatch: Dispatch
) => {
  dispatch(startUpdatePasswordRequest());

  try {
    const res = await requestUpdatePassword(newPassword);
    return dispatch(receiveUpdatePasswordResponse(res));
  } catch (err) {
    return dispatch(receiveUpdatePasswordError(err));
  }
};
