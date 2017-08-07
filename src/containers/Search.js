import React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import { fetchProducts } from '../actions/products';
import Search from '../components/Search';

import {
  logout,
} from '../actions/user';

const fetchProductsReq = ({content, dispatch}) => {
  dispatch(fetchProducts(content));
};

class SearchContainer extends React.Component {
  componentDidMount() {
    const qs = parse(this.props.location.search);
    fetchProductsReq({content: qs.conteudo, dispatch: this.props.dispatch});
  }

  render() {
    return <Search {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.products.isLoading,
    searchTerm: state.products.searchTerm,
    products: state.products.products,
    login: !!state.user.idUser && !!state.user.token,
    idUser: state.user.idUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);