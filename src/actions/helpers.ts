import * as Database from '../database';
import { Dispatch } from '.';
import {
  receiveUpdateUserInfoResponse,
  clearUpdateUserInfoProgress,
} from './auth/userInfo';

export async function pullUserInfoFromLocalDBToRedux(dispatch: Dispatch) {
  try {
    const wellbeing = await Database.abstract.getWellbeing();
    dispatch(receiveUpdateUserInfoResponse({ wellbeing }));
    dispatch(clearUpdateUserInfoProgress());
  } catch (err) {
    //
  }
}
