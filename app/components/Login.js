import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { oAuthBegin } from '../actions/oauth';
import { authorizeUserAndLoadImages } from '../actions/application';
import copy from '../lib/copy';

const mapStateToProps = state => {
  return { 
    tags: state.curator.currentCurator.tags,
    authStatus: state.oAuth.status 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    loginWithInstgram() {
      return authorizeUserAndLoadImages(this)(dispatch);
    }
  }
}

const ButtonStyle = {
  padding: '20px',
  backgroundColor: 'transparent',
  border: '4px solid blue',
  color: 'white',
  fontSize: '2rem',
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  ':hover': {
    color: 'pink',
    border: '4px solid white'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  if (props.authStatus === 'success') { return null; }
  if (props.authStatus === 'error') { return <h6>Error</h6>; }
  let buttonCopy = props.authStatus === 'idle' ? copy.loginButton : 'Loading...';
  return ( <button style={[ButtonStyle]} onClick={props.loginWithInstgram.bind(props.tags)}>{copy.loginButton}</button> );
}));
