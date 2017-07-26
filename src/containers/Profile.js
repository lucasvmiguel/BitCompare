import { connect } from 'react-redux';

import UserForm from '../components/UserForm';

const mapStateToProps = (state, ownProps) => {
  return {
    isNewUser: false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);