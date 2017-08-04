import { connect } from 'react-redux';

import NotFound from '../components/NotFound';

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

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);