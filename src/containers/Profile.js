import { connect } from 'react-redux';

import UserForm from '../components/UserForm';

import {
  logout,
} from '../actions/user';

const mapStateToProps = (state, ownProps) => {
  return {
    login: !!state.user.idUser && !!state.user.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);