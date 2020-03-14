import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import { Action, ActionType } from '../actions';

const logger = createLogger({
  actionTransformer: ({ type, ...rest }: Action) => ({
    type: ActionType[type],
    ...rest,
  }),
});

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

export default createStore(reducers, {}, applyMiddleware(...middleware));
