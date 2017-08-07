import React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from '../actions/user';
import UserForm from '../components/UserForm';

import {
  logout,
  editUser,
  editUserChange,
} from '../actions/user';

const fetchProfileReq = ({id, dispatch}) => {
  dispatch(fetchProfile(id));
};

class ProfileContainer extends React.Component {
  componentDidMount() {
    fetchProfileReq({id: this.props.match.params.id, dispatch: this.props.dispatch});
  }

  render() {
    return <UserForm {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.user.error,
    loading: state.user.isLoading,
    login: !!state.user.idUser && !!state.user.token,
    idUser: state.user.idUser,
    profile: state.user.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: () => dispatch(editUser()),
    onChange: (user) => dispatch(editUserChange(user)),
    logout: () => dispatch(logout()),
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);