import { browserHistory } from 'react-router';
import cookie from 'js-cookie';

import {
  SET_USER_CREDENTIALS,
  SIGNUP_CHANGE,
  SIGNUP_SAVE,
  SIGNUP_SAVE_SUCCESS,
  SIGNUP_SAVE_ERROR,
  LOGIN_CHANGE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  EDIT_USER_CHANGE,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  ADD_OR_REMOVE_PRODUCT_TO_USER,
  ADD_OR_REMOVE_PRODUCT_TO_USER_SUCCESS,
  ADD_OR_REMOVE_PRODUCT_TO_USER_ERROR,
  FETCH_USER_PRODUCTS,
  FETCH_USER_PRODUCTS_SUCCESS,
  FETCH_USER_PRODUCTS_ERROR,
} from '../constants/user';

import { showSnackbar } from '../services/snackbar';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
      if (action.token && action.idUser) {
        return {
          ...state,
          token: action.token,
          idUser: action.idUser,
        }
      }
      return {...state};

    case SIGNUP_CHANGE:
      return {...state, signupForm: action.user};

    case SIGNUP_SAVE:
      return {...state, isLoading: true, error: null};

    case SIGNUP_SAVE_SUCCESS:
      window.customHistory.push('/');
      cookie.set('token', action.token);
      cookie.set('idUser', action.idUser);
      showSnackbar('Usuário foi criado com sucesso!');
      return {...state, isLoading: false, idUser: action.idUser, token: action.token, error: null, signupForm: {}};

    case SIGNUP_SAVE_ERROR:
      return {...state, isLoading: false, error: action.error};

    case LOGIN_CHANGE:
      return {...state, loginForm: action.user};

    case LOGIN:
      return {...state, isLoading: true, error: null};

    case LOGIN_SUCCESS:
      window.customHistory.push('/');
      cookie.set('token', action.token);
      cookie.set('idUser', action.idUser);
      showSnackbar('Usuário foi logado com sucesso!');
      return {...state, isLoading: false, idUser: action.idUser, token: action.token, error: null, loginForm: {}};

    case LOGIN_ERROR:
      return {...state, isLoading: false, error: action.error};

    case FETCH_PROFILE:
      return {...state, isLoading: true};

    case FETCH_PROFILE_SUCCESS:
      return {...state, profile: action.profile, isLoading: false};

    case FETCH_PROFILE_ERROR:
      return {...state, error: action.error, isLoading: false};

    case LOGOUT:
      window.customHistory.push('/');
      cookie.set('token', '');
      cookie.set('idUser', '');
      showSnackbar('Usuário foi deslogado com sucesso');
      return {...state, isLoading: false, idUser: '', token: '', error: null};

    case EDIT_USER_CHANGE:
      return {...state, profile: action.user};

    case EDIT_USER:
      return {...state, isLoading: true, error: null};

    case EDIT_USER_SUCCESS:
      window.customHistory.push('/');
      showSnackbar('Usuário foi alterado com sucesso!');
      return {...state, isLoading: false, error: null, profile: action.profile};

    case ADD_OR_REMOVE_PRODUCT_TO_USER_ERROR:
      return {...state, isLoading: false, error: action.error};

    case ADD_OR_REMOVE_PRODUCT_TO_USER_SUCCESS:
      showSnackbar('Produto selecionado com sucesso!');
      return {...state, isLoading: false, error: null, profile: action.profile};

    case ADD_OR_REMOVE_PRODUCT_TO_USER:
      return {...state, isLoading: true, error: null};

    case FETCH_USER_PRODUCTS:
      return {...state, isLoading: true};

    case FETCH_USER_PRODUCTS_SUCCESS:
      return {...state, products: action.products, isLoading: false};

    case FETCH_USER_PRODUCTS_ERROR:
      return {...state, error: action.error, isLoading: false};
      
    default:
      return state
  }
}