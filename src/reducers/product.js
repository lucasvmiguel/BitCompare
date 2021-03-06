import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
} from '../constants/product';

const initialState = {};

export default function product(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product,
        isLoading: false,
      };

    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    default:
      return state
  }
}