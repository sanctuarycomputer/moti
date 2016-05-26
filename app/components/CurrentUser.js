import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { clearCurrentUser } from '../actions/oauth';

const mapStateToProps = (state) => {
  return { currentUser: state.oAuth.currentUser }
}

const mapDispatchToProps = (dispatch) => {
  return { clearCurrentUser() { return dispatch(clearCurrentUser()) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  if (props.currentUser) {
    return (
      <span onClick={() => props.clearCurrentUser()}>Exit</span>
    );
  }
  return null;
}));
