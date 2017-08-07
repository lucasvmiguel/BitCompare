import {
  SET_USER_CREDENTIALS,
  SIGNUP_CHANGE,
  SIGNUP_SAVE,
  SIGNUP_SAVE_SUCCESS,
  SIGNUP_SAVE_ERROR,
  LOGIN_SUBMIT,
  LOGIN_CHANGE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
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

const signupSaveAction = (content) => {
  return {
    type: SIGNUP_SAVE,
    searchTerm: content,
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

    if (!user) return dispatch(signupSaveError(new Error('Fill the fields!'))); 
    if (user.password !== user.confirmPassword) return dispatch(signupSaveError(new Error('password and confirm password are differents!')));

    dispatch(signupSaveAction())
    return fetch(`http://localhost:8080/user`, { 
      method: 'POST', 
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
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

    if (!user) return dispatch(loginError(new Error('Fill the fields!'))); 

    dispatch(loginAction())
    return fetch(`http://localhost:8080/login`, { 
      method: 'POST', 
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
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
    profile: user
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
      .then(response => response.json())
      .then(json => dispatch(fetchProfileSuccess(json)))
      .catch(err => dispatch(fetchProfileError(err)));
  };
};