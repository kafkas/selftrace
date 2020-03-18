import { AsyncStorage } from 'react-native';
import { Dispatch } from '.';
import {
  receiveUpdateUserInfoResponse,
  clearUpdateUserInfoProgress,
} from './auth/userInfo';

export async function pullUserInfoFromLocalDBToRedux(dispatch: Dispatch) {
  try {
    const wellbeing = await AsyncStorage.getItem('wellbeing');
    dispatch(
      receiveUpdateUserInfoResponse({
        wellbeing: wellbeing === null ? undefined : Number(wellbeing),
      })
    );
    dispatch(clearUpdateUserInfoProgress());
  } catch (err) {
    //
  }
}
