import { requestSignout } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus } from '../../data-types';

const startSignoutRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: {
    message: 'Requesting signout...',
    status: ProgressStatus.REQUEST,
  },
});

const receiveSignoutResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: {
    message: 'Signout success.',
    status: ProgressStatus.SUCCESS,
  },
});

const receiveSignoutError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearSignoutProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

export const signoutUser = () => async (dispatch: Dispatch) => {
  dispatch(startSignoutRequest());

  try {
    const res = await requestSignout();
    return dispatch(receiveSignoutResponse(res));
  } catch (err) {
    return dispatch(receiveSignoutError(err));
  }
};
