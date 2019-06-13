import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { DEBUG } from './config';

import rootReducer from './reducers/rss';

const loggerMiddleware = createLogger();

const middleware = [
  thunkMiddleware,
  DEBUG && loggerMiddleware,
].filter(Boolean);

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);

export default store;
