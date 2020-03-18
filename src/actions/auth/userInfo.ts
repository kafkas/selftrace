import { AsyncStorage } from 'react-native';
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

const GRACEFUL_EXIT_DURATION = 750;

export const uploadUserInfo = (
  updatedInfo: Partial<API.FirestoreUserDoc>
) => async (dispatch: Dispatch) => {
  dispatch(startUpdateUserInfoRequest());
  const { uid } = store.getState().auth.userInfo;

  try {
    await API.requestUpdateUserInfo(uid, updatedInfo);
    dispatch(receiveUpdateUserInfoResponse(updatedInfo));
    setTimeout(() => {
      dispatch(clearUpdateUserInfoProgress());
    }, GRACEFUL_EXIT_DURATION);
  } catch (err) {
    dispatch(receiveUpdateUserInfoError(err));
  }
};

/*
 * Helper functions
 */
export async function downloadUserInfoToLocalDB(uid: string) {
  try {
    const userDoc = await API.requestUserInfo(uid);

    if (!userDoc) {
      // The user has just signed up. The server is creating the user document in Firestore.
      return undefined;
    }
    const { wellbeing } = userDoc;
    await AsyncStorage.setItem('wellbeing', wellbeing.toString());

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}
