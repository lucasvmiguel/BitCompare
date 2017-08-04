import { connect } from 'react-redux';

import Search from '../components/Search';

import {
  logout,
} from '../actions/user';

const mapStateToProps = (state, ownProps) => {
  return {
    loading: false,
    searchTerm: "bla",
    products: [],
    login: !!state.user.idUser && !!state.user.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);