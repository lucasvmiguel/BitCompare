import React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import { fetchProducts } from '../actions/products';
import Search from '../components/Search';

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
    products: state.products.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);