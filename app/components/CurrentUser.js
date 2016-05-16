import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { clearCurrentUser } from '../actions/oauth';

import Image from '../components/Image';

import CoreStyles from '../lib/styles';
const Styles = {
  base: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)', 
    textAlign: 'center',
    zIndex: 10,
  },
  profilePicture: {
    width: '40px',
    borderRadius: '50%'
  },
  username: {
    fontSize: '1rem',
    lineHeight: 'initial',
  },
  logout: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'underline',
    margin: 0
  }
};

const mapStateToProps = (state) => {
  return { currentUser: state.oAuth.currentUser }
}

const mapDispatchToProps = (dispatch) => {
  return { clearCurrentUser() { return dispatch(clearCurrentUser()) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  if (props.currentUser) {
    return (
      <div style={[Styles.base]}>
        <Image style={[Styles.profilePicture]} src={props.currentUser.profilePicture} />
        <p style={[CoreStyles.fontStyle, Styles.username]}>{props.currentUser.username}</p>
        <p style={[Styles.logout]} onClick={() => props.clearCurrentUser()}>Exit</p>
      </div>
    );
  }
  return null;
}));
