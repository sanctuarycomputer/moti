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
    grey 
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
  appNavLink: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)',
    color: white
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

  appNavLinkForCurrentPath(pathname) {
    if (pathname.includes('information'))  {
      return {
        path: '/',
        copy: 'Gallery'
      } 
    }
    return {
      path: '/information',
      copy: 'Information'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && !nextProps.currentUser) { this.userDidLogout(); }
  }

  userDidLogout = () => {
    if (this.props.currentPath !== '/') { browserHistory.push('/'); }
  }
  
  render() {
    let appNavLinkInfo = this.appNavLinkForCurrentPath(this.props.currentPath);
    return (
      <div>
        <Loader isLoading={this.props.isLoading} />

        <CurrentUser />

        <StyleableLink to={appNavLinkInfo.path} style={[
          Styles.appNavLink,
          CoreStyles.linkStyle,
          CoreStyles.fontStyle
        ]}>{appNavLinkInfo.copy}</StyleableLink>

        <div style={[Styles.wrapper]}>
          <div style={[Styles.base]}>{this.props.children}</div>
        </div>
      </div>
    )
  }
}
