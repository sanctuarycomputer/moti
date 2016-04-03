import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { clearCurrentUser } from '../actions/oauth';

import Image from '../components/Image';

import CoreStyles from '../lib/styles';
const Styles = {
  base: {
    width: '100%',
    position: 'fixed',
    top: 0,
    textAlign: 'center'
  },
  profilePicture: {
    width: '60px',
    borderRadius: '50px' 
  },
  username: {
    fontSize: '1rem',
    lineHeight: 'initial',
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.oAuth.currentUser 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser() { return dispatch(clearCurrentUser()) }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Radium
export default class CurrentUser extends Component {
  render() {
    if (this.props.currentUser) {
      return (
        <div style={[Styles.base]}>
          <Image style={[Styles.profilePicture]} src={this.props.currentUser.profilePicture} />
          <p style={[CoreStyles.fontStyle, Styles.username]}>{this.props.currentUser.username}</p>
          <p onClick={() => this.props.clearCurrentUser()}>Exit</p>
        </div>
      );
    }
    return null;
  }
}
