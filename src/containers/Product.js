import React from 'react';
import { connect } from 'react-redux';

import { fetchProduct } from '../actions/product';
import Product from '../components/Product';

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
    product: state.product.product
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);