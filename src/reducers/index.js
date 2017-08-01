import { combineReducers } from 'redux'

import products from './products';
import product from './product';
import user from './user';

const reducers = combineReducers({
  products,
  product,
  user,
});

export default reducers;