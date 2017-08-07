import R from 'ramda';

import { acceptOrRejectRequest } from '../services/request';

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

export const setUserCredentials = ({ idUser, token }) => {
  return {
    type: SET_USER_CREDENTIALS,
    idUser,
    token
  };
};

//////////// SIGNUP /////////////

export const signupChange = (user) => {
  return { type: SIGNUP_CHANGE, user};
}

const signupSaveAction = () => {
  return {
    type: SIGNUP_SAVE,
  };
};

const signupSaveSuccess = ({ idUser, token }) => {
  return {
    type: SIGNUP_SAVE_SUCCESS,
    idUser,
    token
  };
};

const signupSaveError = (error) => {
  return {
    type: SIGNUP_SAVE_ERROR, 
    error: error
  };
};

export const signupSave = () => {
  return (dispatch, getState) => {
    const state = getState();
    const user = state.user.signupForm;

    if (!user) return dispatch(signupSaveError(new Error('Preencha os campo corretamente!'))); 
    if (user.password !== user.confirmPassword) return dispatch(signupSaveError(new Error('Senha e confirmação precisam ser iguais!')));

    dispatch(signupSaveAction())
    return fetch(`http://localhost:8080/user`, { 
      method: 'POST', 
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(signupSaveSuccess(json)))
      .catch(err => dispatch(signupSaveError(err)));
  };
};

//////////// LOGOUT /////////////

const logoutAction = () => {
  return {
    type: LOGOUT
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const idUser = state.user.idUser;

    dispatch(logoutAction())
    return fetch(`http://localhost:8080/logout/${idUser}`, { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json', token: token}
    }).then(() => console.log('logout'));
  };
};


//////////// LOGIN /////////////

export const loginChange = (user) => {
  return { type: LOGIN_CHANGE, user};
}

const loginAction = (content) => {
  return {
    type: LOGIN,
    searchTerm: content,
  };
};

const loginSuccess = ({ idUser, token }) => {
  return {
    type: LOGIN_SUCCESS,
    idUser,
    token
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_ERROR, 
    error: error
  };
};

export const login = () => {
  return (dispatch, getState) => {
    const state = getState();
    const user = state.user.loginForm;

    if (!user) return dispatch(loginError(new Error('Preencha os campo corretamente!'))); 

    dispatch(loginAction())
    return fetch(`http://localhost:8080/login`, { 
      method: 'POST', 
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(loginSuccess(json)))
      .catch(err => dispatch(loginError(err)));
  };
};

//////////// PROFILE /////////////

const fetchProfileAction = () => {
  return {
    type: FETCH_PROFILE,
  };
};

const fetchProfileSuccess = (user) => {
  return {
    type: FETCH_PROFILE_SUCCESS, 
    profile: {...user, confirmPassword: ''}
  };
};

const fetchProfileError = (error) => {
  return {
    type: FETCH_PROFILE_ERROR, 
    error: error
  };
};

export const fetchProfile = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    dispatch(fetchProfileAction())
    return fetch(`http://localhost:8080/user/${id}`, {
      headers: {'token': token}
    })
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(fetchProfileSuccess(json)))
      .catch(err => dispatch(fetchProfileError(err)));
  };
};


//////////// EDIT USER /////////////

export const editUserChange = (user) => {
  return { type: EDIT_USER_CHANGE, user};
}

const editUserAction = () => {
  return {
    type: EDIT_USER
  };
};

const editUserSuccess = (user) => {
  return {
    type: EDIT_USER_SUCCESS,
    profile: user
  };
};

const editUserError = (error) => {
  return {
    type: EDIT_USER_ERROR, 
    error: error
  };
};

export const editUser = () => {
  return (dispatch, getState) => {
    const state = getState();
    const user = state.user.profile;
    const token = state.user.token;
    const idUser = state.user.idUser;

    if (user.password !== user.confirmPassword) return dispatch(signupSaveError(new Error('Senha e confirmação precisam ser iguais!')));

    dispatch(editUserAction())
    return fetch(`http://localhost:8080/user/${idUser}`, { 
      method: 'PUT', 
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(editUserSuccess(json)))
      .catch(err => dispatch(editUserError(err)));
  };
};

//////////// ADD OR REMOVE PRODUCT TO USER /////////////

const addOrRemoveProductToUserAction = () => {
  return {
    type: ADD_OR_REMOVE_PRODUCT_TO_USER,
  };
};

const addOrRemoveProductToUserSuccess = (user) => {
  return {
    type: ADD_OR_REMOVE_PRODUCT_TO_USER_SUCCESS, 
    profile: user
  };
};

const addOrRemoveProductToUserError = (error) => {
  return {
    type: ADD_OR_REMOVE_PRODUCT_TO_USER_ERROR, 
    error: error
  };
};

export const addOrRemoveProductToUser = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const idUser = state.user.idUser;
    const token = state.user.token;

    const user = state.user.profile;
    let method = 'POST';

    if (R.contains(id, user.products)) {
      method = 'DELETE';
    }

    dispatch(addOrRemoveProductToUserAction());
    return fetch(`http://localhost:8080/user/${idUser}/product/${id}`, { 
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(addOrRemoveProductToUserSuccess(json)))
      .catch(err => dispatch(addOrRemoveProductToUserError(err)));
  };
};


///////////// FETCH USER PRODUCTS //////////////// 


const fetchUserProductsAction = () => {
  return {
    type: FETCH_USER_PRODUCTS,
  };
};

const fetchUserProductsSuccess = (products) => {
  return {
    type: FETCH_USER_PRODUCTS_SUCCESS, 
    products: products
  };
};

const fetchUserProductsError = (error) => {
  return {
    type: FETCH_USER_PRODUCTS_ERROR, 
    error: error
  };
};

export const fetchUserProducts = () => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const idUser = state.user.idUser;

    dispatch(fetchProfileAction())
    return fetch(`http://localhost:8080/user/${idUser}/product`, {
      headers: {'token': token}
    })
      .then(response => acceptOrRejectRequest(response))
      .then(json => dispatch(fetchUserProductsSuccess(json)))
      .catch(err => dispatch(fetchUserProductsError(err)));
  };
};