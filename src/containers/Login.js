import { connect } from 'react-redux';

import Login from '../components/Login';

import {
  login,
  loginChange,
} from '../actions/user';

const mapStateToProps = (state, ownProps) => {
  return {
    login: !!state.user.idUser && !!state.user.token,
    error: state.user.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: () => dispatch(login()),
    onChange: (user) => dispatch(loginChange(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);