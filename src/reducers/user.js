import { browserHistory } from 'react-router';
import cookie from 'js-cookie';

import {
  SET_USER_CREDENTIALS,
  SIGNUP_CHANGE,
  SIGNUP_SUBMIT,
  SIGNUP_SAVE,
  SIGNUP_SAVE_SUCCESS,
  SIGNUP_SAVE_ERROR,
  LOGIN_CHANGE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../constants/user';

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
      return {...state, isLoading: false, idUser: action.idUser, token: action.token, error: null, loginForm: {}};

    case LOGIN_ERROR:
      return {...state, isLoading: false, error: action.error};

    case LOGOUT:
      window.customHistory.push('/');
      cookie.set('token', '');
      cookie.set('idUser', '');
      return {...state, isLoading: false, idUser: '', token: '', error: null};
      
    default:
      return state
  }
}