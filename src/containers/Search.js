import { connect } from 'react-redux';

import Search from '../components/Search';

const products = [
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
  {name: "TESTEEEEEEEEEEEEEEEEEEEEEEEEEEEE", price: 999.99, rate: 4.5, image: 'http://via.placeholder.com/500x500'},
]

const mapStateToProps = (state, ownProps) => {
  return {
    loading: false,
    searchTerm: "bla",
    products: products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);