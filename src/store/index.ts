import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

export default createStore(reducers, {}, applyMiddleware(...middleware));
