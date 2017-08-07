import fetch from 'node-fetch';

import { acceptOrRejectRequest } from '../services/request';

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from '../constants/products';

const fetchProductsAction = (content) => {
  return {
    type: FETCH_PRODUCTS,
    searchTerm: content,
  };
};

const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS, 
    products: products
  };
};

const fetchProductsError = (error) => {
  return {
    type: FETCH_PRODUCTS_ERROR, 
    error: error
  };
};

export const fetchProducts = (content) => {
  return dispatch => {
    dispatch(fetchProductsAction(content))
    return fetch(`http://localhost:8080/product?content=${content}`)
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(fetchProductsSuccess(json)))
      .catch(err => dispatch(fetchProductsError(err)));
  };
};