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
  appNav: {
    position: 'fixed',
    top: '50%',
    left: '0',
    transform: 'translateX(-36%) rotate(-90deg)',
    zIndex: 3,
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

    return (
      <div>
        <Loader isLoading={this.props.isLoading} />

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
