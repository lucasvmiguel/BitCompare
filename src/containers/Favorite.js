import React from 'react';
import { connect } from 'react-redux';

import Search from '../components/Search';

import { logout, fetchUserProducts, addOrRemoveProductToUser } from '../actions/user';

const fetchUserProductsReq = ({dispatch}) => {
  dispatch(fetchUserProducts());
};

class FavoriteContainer extends React.Component {
  componentDidMount() {
    fetchUserProductsReq({dispatch: this.props.dispatch});
  }

  render() {
    return <Search {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.user.isLoading,
    products: state.user.products,
    idUser: state.user.idUser,
    login: !!state.user.idUser && !!state.user.token,
    user: state.user.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    logout: () => dispatch(logout()),
    addOrRemoveProductToUser: (id) => dispatch(addOrRemoveProductToUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteContainer);