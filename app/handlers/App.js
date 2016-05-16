import React, { Component } from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StyleableLink from '../components/StyleableLink';
import CurrentUser from '../components/CurrentUser';
import Loader from '../components/Loader';

import CoreStyles from '../lib/styles';
import { Status as ApplicationStatusMap } from '../reducers/application';

const { 
  colors: { 
    white, 
    grey,
    greyMid
  }
} = CoreStyles;

const Styles = {
  base: {
    width: '60vw',
    minHeight: '100vh',
    margin: '0 auto 0 auto',
    textAlign: 'center',
  },
  wrapper: {
    background: [
      'rgba(0,0,0,1)', 
      '-moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      '-webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,1)), color-stop(52%, rgba(64,64,65,1)), color-stop(100%, rgba(0,0,0,1)))', 
      '-webkit-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      '-o-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      '-ms-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)'
    ],
  },
  appNav: {
    position: 'fixed',
    top: '50%',
    left: '0',
    transform: 'translateX(-36%) rotate(-90deg)'
  },
  appNavLink: {
    color: greyMid,
    fontSize: '1rem',
    lineHeight: '2rem',
    display: 'inline-block',
    margin: '0 15px'
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.application.status === ApplicationStatusMap.LOADING,
    currentUser: state.oAuth.currentUser,
    currentPath: state.routing.locationBeforeTransitions.pathname
  };
}

@connect(mapStateToProps)
@Radium
export default class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && !nextProps.currentUser) { this.userDidLogout(); }
  }

  userDidLogout = () => {
    if (this.props.currentPath !== '/') { browserHistory.push('/'); }
  }
  
  render() {
    let hasCurrentUser = !this.props.currentUser;

    return (
      <div>
        <Loader isLoading={hasCurrentUser} />

        <CurrentUser />

        <nav style={[Styles.appNav]}>
          <StyleableLink to='/information' style={[
            CoreStyles.linkStyle,
            Styles.appNavLink
          ]}>About</StyleableLink>

          <StyleableLink to='/' style={[
            CoreStyles.linkStyle,
            Styles.appNavLink
          ]}>Featured Gallery</StyleableLink>

          <StyleableLink to='/permanent-collection' style={[
            CoreStyles.linkStyle,
            Styles.appNavLink
          ]}>Permenant Collection</StyleableLink>
        </nav>

        <div>{this.props.children}</div>
      </div>
    )
  }
}
