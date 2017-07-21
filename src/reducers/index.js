import { combineReducers } from 'redux'

import home from './home';
import login from './login';
import notFound from './notFound';
import product from './product';
import search from './search';
import signup from './signup';

const reducers = combineReducers({
  home,
  login,
  notFound,
  product,
  search,
  signup
});

export default reducers;