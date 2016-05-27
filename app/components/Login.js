import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { oAuthBegin } from '../actions/oauth';
import { authorizeUserAndLoadImages } from '../actions/application';
import { didShowFlashMessage } from '../actions/flashMessage';
import flashMessageText  from '../lib/flashMessage';
import copy from '../lib/copy';
import CoreStyles from '../lib/styles';

const { 
  colors: { white, grey }
} = CoreStyles;


const mapStateToProps = state => {
  return { 
    applicationStatus: state.application.status,
    tags: state.curator.currentCurator.tags,
    authStatus: state.oAuth.status 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    loginWithInstgram: () => { return authorizeUserAndLoadImages(this)(dispatch); },
    didShowFlashMessage:(status, text) => { return dispatch(didShowFlashMessage(status, text)) }
  }
}

const ButtonStyle = {
  padding: '20px',
  backgroundColor: 'transparent',
  color: white,
  border: `4px solid ${white}`,
  fontSize: '2rem',
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 1,
  top: '75%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: '1s',
  opacity: 0,
  ':hover': {
    color: grey,
    border: `4px solid ${grey}`
  }
}

const ButtonShow = {
  opacity: 1
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  let styleArray = props.applicationStatus === 'ready' ? [ButtonStyle, ButtonShow] : [ButtonStyle];
   
  if (props.authStatus === 'success') { return null; }
  if (props.authStatus === 'error') { props.didShowFlashMessage('error', flashMessageText.cantAuth) }
  let buttonCopy = props.authStatus === 'idle' ? copy.loginButton : 'Loading...';
  return ( <button style={styleArray} onClick={props.loginWithInstgram.bind(props.tags)}>{buttonCopy}</button> );
}));
