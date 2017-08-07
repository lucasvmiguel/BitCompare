import React from 'react';
import { connect } from 'react-redux';

import { fetchProduct } from '../actions/product';
import Product from '../components/Product';

import { logout, addOrRemoveProductToUser } from '../actions/user';

const fetchProductsReq = ({id, dispatch}) => {
  dispatch(fetchProduct(id));
};

class ProductContainer extends React.Component {
  componentDidMount() {
    fetchProductsReq({id: this.props.match.params.id, dispatch: this.props.dispatch});
  }

  render() {
    return <Product {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.product.isLoading,
    product: state.product.product,
    login: !!state.user.idUser && !!state.user.token,
    idUser: state.user.idUser,
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);