import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { authorizeUserAndLoadImages } from '../actions/application';
import { didShowFlashMessage } from '../actions/flashMessage';
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
    loginWithInstagram: function() { 
      return authorizeUserAndLoadImages(this)(dispatch); 
    },
    didShowFlashMessage: (status, text) => { 
      return dispatch(didShowFlashMessage(status, text));
    }
  }
}

const ButtonStyle = {
  padding: '15px',
  backgroundColor: 'transparent',
  color: white,
  border: `2px solid ${white}`,
  fontSize: '1.5rem',
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 1,
  top: '75%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: '1s',
  opacity: 0,
  fontFamily: 'inherit',
  fontWeight: '300',
  letterSpacing: '2px',
  outline: 'none',
  ':hover': {
    color: grey,
    border: `2px solid ${grey}`
  }
}

const ButtonShow = {
  opacity: 1
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  let styleArray = props.applicationStatus === 'ready' ? [ButtonStyle, ButtonShow] : [ButtonStyle];
   
  if (props.authStatus === 'success') { return null; }
  if (props.authStatus === 'error') { props.didShowFlashMessage('error', copy.flashMessages.cantAuth) }
  let buttonCopy = props.authStatus === 'idle' ? 'Enter' : 'Loading...';

  return ( <button style={styleArray} onClick={props.loginWithInstagram.bind(props.tags)}>{'Enter'}</button> );
}));
