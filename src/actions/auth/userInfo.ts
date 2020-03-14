import * as API from '../../api';
import store from '../../store';
import { ReduxAuthUserInfo } from '../../reducers/auth/userInfo';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus } from '../../data-types';

/*
 * Action creators
 */

export const startUpdateUserInfoRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: 'Updating...',
    status: ProgressStatus.REQUEST,
  },
});

export const receiveUpdateUserInfoResponse: ActionCreator<NetworkAction> = (
  updatedInfo: Partial<ReduxAuthUserInfo>
) => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  payload: updatedInfo,
  progress: {
    message: 'Update successful.',
    status: ProgressStatus.SUCCESS,
  },
});

export const receiveUpdateUserInfoError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearUpdateUserInfoProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

export const uploadUserInfo = (
  updatedInfo: Partial<API.FirestoreUserDoc>
) => async (dispatch: Dispatch) => {
  dispatch(startUpdateUserInfoRequest());
  const { uid } = store.getState().auth.userInfo;

  try {
    await API.requestUpdateUserInfo(uid, updatedInfo);

    return dispatch(receiveUpdateUserInfoResponse(updatedInfo));
  } catch (err) {
    return dispatch(receiveUpdateUserInfoError(err));
  }
};

/*
 * Helper functions
 */
export async function downloadUserInfo(uid: string, dispatch: Dispatch) {
  dispatch(startUpdateUserInfoRequest());
  try {
    const userDoc = await API.requestUserInfo(uid);
    if (!userDoc) {
      // The user has just signed up. The server is creating the user document in Firestore.
      return undefined;
    }

    const { email } = userDoc;
    const userInfo: ReduxAuthUserInfo = { email };
    dispatch(receiveUpdateUserInfoResponse(userInfo));
    dispatch(clearUpdateUserInfoProgress());
    return Promise.resolve();
  } catch (err) {
    dispatch(receiveUpdateUserInfoError(err));
    return Promise.reject(err);
  }
}
