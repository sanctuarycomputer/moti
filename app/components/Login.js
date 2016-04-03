import React, { Component } from 'react';
import ENV from '../config/Environment';

import { connect } from 'react-redux';
import { oAuthBegin } from '../actions/oauth';

@connect()
export default class Login extends Component {

  constructor(props) {
    super(...arguments);
    this.instagramAuthEndpoint = 
      `https://api.instagram.com/oauth/authorize/?client_id=${ENV.INSTAGRAM_CLIENT_ID}&redirect_uri=${ENV.OAUTH_REDIRECT_URI}&response_type=token`;
  }

  render() { 
    return (
      <button onClick={() => {
        oAuthBegin('instagram', this.instagramAuthEndpoint)(this.props.dispatch)
      }}>Login with Instgram</button> 
    ); 
  }
}
