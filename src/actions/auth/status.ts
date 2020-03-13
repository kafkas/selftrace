import * as Database from '../../database';
import * as API from '../../api';
import { ActionCreator, AuthStatusAction, Dispatch, ActionType } from '..';
import { ReduxAuthUserInfo } from '../../reducers/auth/userInfo';
import { AuthStatus } from '../../data-types';

const setAuthStatusToSignedIn: ActionCreator<AuthStatusAction> = (
  userInfo: ReduxAuthUserInfo
) => ({
  type: ActionType.SET_AUTH_STATUS,
  payload: { status: AuthStatus.SignedIn, userInfo },
});

const setAuthStatusToSignedOut: ActionCreator<AuthStatusAction> = () => ({
  type: ActionType.SET_AUTH_STATUS,
  payload: { status: AuthStatus.SignedOut },
});

export const subscribeToAuthStateChange = () => (dispatch: Dispatch) => {
  API.initialize();

  return API.requestAuthStateListener((user: API.UserInfo) => {
    if (!user) {
      // Signed out
      Database.clear();
      return dispatch(setAuthStatusToSignedOut());
    }

    // Signed in
    Database.initialize();
    const userInfo: ReduxAuthUserInfo = {
      email: user.email,
      uid: user.uid,
    };

    return dispatch(setAuthStatusToSignedIn(userInfo));
  });
};
