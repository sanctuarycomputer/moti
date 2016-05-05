import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oAuthBegin } from '../actions/oauth';
import copy from '../lib/copy';

const mapStateToProps = (state) => {
  return { authStatus: state.oAuth.status }
}

const mapDispatchToProps = (dispatch) => {
  return { loginWithInstgram() { return oAuthBegin('instagram')(dispatch) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  switch(props.authStatus) {
    case 'idle':
      return <button onClick={props.loginWithInstgram}>{copy.loginButton}</button>;
    case 'pending':
      return <h6>Loading</h6>;
    case 'error':
      return <h6>Error</h6>;
    case 'success':
      return null;
  }
});
