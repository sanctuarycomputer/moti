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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    loginWithInstagram: function(tags) { 
      console.log(authorizeUserAndLoadImages(tags)(dispatch));
      return authorizeUserAndLoadImages(tags)(dispatch); 
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
  opacity: 1,
  fontFamily: 'inherit',
  fontWeight: '300',
  letterSpacing: '2px',
  outline: 'none',
  ':hover': {
    color: grey,
    border: `2px solid ${grey}`
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  return ( 
    <button style={[ButtonStyle]} onClick={props.loginWithInstagram.bind(this, props.tags)}>{'Enter'}</button> 
  );
}));
