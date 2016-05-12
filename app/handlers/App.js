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

        <div>{this.props.children}</div>
      </div>
    )
  }
}
