import { combineReducers } from 'redux';
import auth, { ReduxAuth } from './auth';
import sync, { ReduxSync } from './sync';

export interface ReduxRoot {
  auth: ReduxAuth;
  sync: ReduxSync;
}

export * from './auth';
export * from './sync';

export default combineReducers({
  auth,
  sync,
});
