import { connect } from 'react-redux';

import Product from '../components/Product';

const mapStateToProps = (state, ownProps) => {
  return {
    loading: false,
    product: {
      image: 'http://via.placeholder.com/500x500',
      id: '1',
      name: 'TESTEEEEEEEEEEEEEEEEEEEEEEE',
      price: 999.99,
      rate: 4.5,
      attributes: [{name: 'memoria', value: '8gb'}, {name: 'memoria 2', value: '16gb'}],
      offers: [{name: 'eloja', brand: 'americanas.com', price: 888.88}, {name: 'eloja', brand: 'shoptime', price: 888.88}]
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);