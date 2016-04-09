import React, { Component } from 'react';

import { connect } from 'react-redux';
import { oAuthBegin } from '../actions/oauth';
import copy from '../lib/copy';

const mapStateToProps = (state) => {
  return {
    authStatus: state.oAuth.status
  }
}

@connect(mapStateToProps)
export default class Login extends Component {
  
  renderLoginButton = () => {
    return (<button onClick={() => { oAuthBegin('instagram')(this.props.dispatch) }}>{copy.loginButton}</button>);
  }

  render() {
    switch(this.props.authStatus) {
      case 'idle':
        return this.renderLoginButton();
      case 'pending':
        return <div>Loading</div>;
      case 'error':
        return <div>Error</div>;
      case 'success':
        return null;
    }
  }
}
