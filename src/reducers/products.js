import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from '../constants/products';

const initialState = {};

export default function products(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        searchTerm: action.searchTerm,
        isLoading: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    default:
      return state
  }
}