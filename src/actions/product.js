import fetch from 'node-fetch';
import R from 'ramda';

import { acceptOrRejectRequest } from '../services/request';

import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
} from '../constants/product';

const fetchProductAction = () => {
  return {
    type: FETCH_PRODUCT,
  };
};

const fetchProductSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_SUCCESS, 
    product: product
  };
};

const fetchProductError = (error) => {
  return {
    type: FETCH_PRODUCT_ERROR, 
    error: error
  };
};

export const fetchProduct = (id) => {
  return dispatch => {
    dispatch(fetchProductAction());
    return fetch(`http://localhost:8080/product/${id}`)
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(fetchProductSuccess(json)))
      .catch(err => dispatch(fetchProductError(err)));
  };
};

