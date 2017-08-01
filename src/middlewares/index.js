import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const middlewares = applyMiddleware(
  createLogger(),
  thunkMiddleware
);

export default middlewares;