import { connect } from 'react-redux';

import { 
  signupSave,
  signupChange,
  logout,
} from '../actions/user';

import UserForm from '../components/UserForm';

const mapStateToProps = (state, ownProps) => {
  return {
    login: !!state.user.idUser && !!state.user.token,
    error: state.user.error,
    idUser: state.user.idUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: () => dispatch(signupSave()),
    onChange: (user) => dispatch(signupChange(user)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);