import { applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';

const middlewares = applyMiddleware(
  createLogger()
);

export default middlewares;