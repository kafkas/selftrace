import { AuthStatusAction } from '../../actions';
import { AuthStatus } from '../../data-types';

export type ReduxAuthStatus = AuthStatus;

export const status = (action: AuthStatusAction): ReduxAuthStatus =>
  action.payload.status;
