import * as Database from '../database';
import { Dispatch } from '.';
import { receiveUpdateUserInfoResponse } from './auth/userInfo';

export async function pullRefreshFromLocalDB(dispatch: Dispatch) {
  try {
    const wellbeing = await Database.abstract.getWellbeing();
    dispatch(receiveUpdateUserInfoResponse({ wellbeing }));
  } catch (err) {
    //
  }
}
